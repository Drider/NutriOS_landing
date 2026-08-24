import { useEffect, useRef, type ReactNode } from 'react'
import styles from './AnimatedGradient.module.css'

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[4];
uniform vec3  u_bg;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
    dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;

  float t = u_time * 0.1;

  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;

  float dist = length(p) * 1.5;
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);

  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);

  float glow = smoothstep(0.8, 0.0, dist) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '')
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ]
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export interface AnimatedGradientProps {
  bg?: string
  colors?: string[]
  speed?: number
  grain?: number
  className?: string
  children?: ReactNode
}

const DEFAULT_COLORS = ['#7FD9A6', '#3FA876', '#2F8050', '#12261A']

export function AnimatedGradient({
  bg = '#0F1D15',
  colors = DEFAULT_COLORS,
  speed = 0.7,
  grain = 0.15,
  className,
  children,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const program = gl.createProgram()
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!program || !vertexShader || !fragmentShader) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const locations = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      grain: gl.getUniformLocation(program, 'u_grain'),
      colors: gl.getUniformLocation(program, 'u_colors'),
      bg: gl.getUniformLocation(program, 'u_bg'),
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = Math.max(1, Math.round(container.clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(container.clientHeight * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const bgRgb = hexToRgb(bg)
    const colorsRgb = new Float32Array(colors.slice(0, 4).flatMap(hexToRgb))

    const draw = (time: number) => {
      gl.uniform2f(locations.resolution, canvas.width, canvas.height)
      gl.uniform1f(locations.time, time)
      gl.uniform1f(locations.grain, grain)
      gl.uniform3f(locations.bg, bgRgb[0], bgRgb[1], bgRgb[2])
      gl.uniform3fv(locations.colors, colorsRgb)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      draw(0)
      return () => resizeObserver.disconnect()
    }

    let rafId = 0
    let isRunning = false

    const render = (time: number) => {
      draw(time * 0.001 * speed)
      rafId = requestAnimationFrame(render)
    }

    const startLoop = () => {
      if (isRunning) return
      isRunning = true
      rafId = requestAnimationFrame(render)
    }

    const stopLoop = () => {
      isRunning = false
      cancelAnimationFrame(rafId)
    }

    const visibilityObserver = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        startLoop()
      } else {
        stopLoop()
      }
    })
    visibilityObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      stopLoop()
    }
  }, [bg, colors, speed, grain])

  return (
    <div ref={containerRef} className={`${styles.wrapper} ${className ?? ''}`.trim()}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
