'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  GitBranch,
  RefreshCw,
  X,
  Search,
  Sparkles,
  ExternalLink,
  FileText,
  Database,
  Cpu,
  Briefcase,
  Code,
  Trophy,
  User,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  Layers,
  Zap,
  ChevronDown,
  Share2,
  Wand2,
  GraduationCap,
  Award,
  Target,
  Filter,
  Play,
  Pause,
  Palette,
  Flower2,
  Boxes,
  GitFork,
  AlignVerticalSpaceAround,
  Radio
} from 'lucide-react';
import { fetchKnowledgeGraph, LiveKnowledgeGraph, LiveGraphNode, LiveGraphEdge } from '@/lib/api';

// ── Themes & Color Palettes ──────────────────────────────────────────────────
export const THEME_PALETTES = {
  cyberpunk: {
    id: 'cyberpunk',
    name: '⚡ Cyberpunk Neon',
    bg: '#030712',
    gridColor: 'rgba(0, 240, 255, 0.04)',
    nodeColors: {
      user: '#00f0ff',          // Electric Cyan
      skill: '#39ff14',         // Neon Lime
      project: '#b026ff',       // Cyber Purple
      experience: '#ff007f',    // Hot Pink
      achievement: '#ffd700',   // Laser Gold
      education: '#00ffff',     // Bright Cyan
      certification: '#00e5ff', // Aqua
      opportunity: '#ff5500',   // Blazing Orange
      document: '#38bdf8',      // Sky
      evidence: '#ec4899',      // Rose
      goal: '#fbbf24',          // Amber
      general: '#818cf8',       // Indigo
    },
    edgeColors: {
      POSSESSES_SKILL: '#39ff14',
      KNOWS_SKILL: '#39ff14',
      BUILT_PROJECT: '#b026ff',
      USES_TECH: '#64748b',
      WORKED_AT: '#ff007f',
      EARNED_AWARD: '#ffd700',
      STUDIED_AT: '#00ffff',
      SUPPORTED_BY: '#ec4899',
      TARGETS_GOAL: '#ffd700',
      REQUIRES_SKILL: '#38bdf8',
      MATCHES_PROFILE: '#ff5500',
      SOURCES_CANDIDATE_DATA: '#38bdf8',
      CONNECTED_TO: '#475569',
    }
  },
  cosmic: {
    id: 'cosmic',
    name: '🌌 Cosmic Nebula',
    bg: '#020617',
    gridColor: 'rgba(139, 92, 246, 0.05)',
    nodeColors: {
      user: '#818cf8',          // Light Indigo
      skill: '#34d399',         // Emerald Green
      project: '#c084fc',       // Starlight Violet
      experience: '#f472b6',    // Nebula Pink
      achievement: '#fbbf24',   // Solar Gold
      education: '#38bdf8',     // Celestial Sky
      certification: '#2dd4bf', // Astral Teal
      opportunity: '#fb923c',   // Cosmic Orange
      document: '#93c5fd',      // Moonstone
      evidence: '#f43f5e',      // Crimson Rose
      goal: '#fde047',          // Sunbeam
      general: '#a5b4fc',       // Soft Indigo
    },
    edgeColors: {
      POSSESSES_SKILL: '#34d399',
      KNOWS_SKILL: '#34d399',
      BUILT_PROJECT: '#c084fc',
      USES_TECH: '#64748b',
      WORKED_AT: '#f472b6',
      EARNED_AWARD: '#fbbf24',
      STUDIED_AT: '#38bdf8',
      SUPPORTED_BY: '#f43f5e',
      TARGETS_GOAL: '#fde047',
      REQUIRES_SKILL: '#38bdf8',
      MATCHES_PROFILE: '#fb923c',
      SOURCES_CANDIDATE_DATA: '#93c5fd',
      CONNECTED_TO: '#475569',
    }
  },
  matrix: {
    id: 'matrix',
    name: '🛡️ ArmorIQ / Tactical Matrix',
    bg: '#030d0a',
    gridColor: 'rgba(16, 185, 129, 0.06)',
    nodeColors: {
      user: '#10b981',          // Phosphor Green
      skill: '#34d399',         // Emerald
      project: '#059669',       // Deep Forest
      experience: '#065f46',    // Dark Green
      achievement: '#f59e0b',   // Tactical Amber
      education: '#14b8a6',     // Cyber Teal
      certification: '#0d9488', // Dark Teal
      opportunity: '#f97316',   // High-Threat Orange
      document: '#6ee7b7',      // Light Mint
      evidence: '#10b981',      // Pure Emerald
      goal: '#facc15',          // Amber Gold
      general: '#2dd4bf',       // Teal
    },
    edgeColors: {
      POSSESSES_SKILL: '#34d399',
      KNOWS_SKILL: '#34d399',
      BUILT_PROJECT: '#10b981',
      USES_TECH: '#475569',
      WORKED_AT: '#059669',
      EARNED_AWARD: '#f59e0b',
      STUDIED_AT: '#14b8a6',
      SUPPORTED_BY: '#10b981',
      TARGETS_GOAL: '#facc15',
      REQUIRES_SKILL: '#14b8a6',
      MATCHES_PROFILE: '#f97316',
      SOURCES_CANDIDATE_DATA: '#6ee7b7',
      CONNECTED_TO: '#1e293b',
    }
  },
  minimal_glass: {
    id: 'minimal_glass',
    name: '💎 Obsidian Glass',
    bg: '#09090b',
    gridColor: 'rgba(255, 255, 255, 0.03)',
    nodeColors: {
      user: '#6366f1',          // Indigo Iris
      skill: '#10b981',         // Soft Mint
      project: '#8b5cf6',       // Lavender
      experience: '#ec4899',    // Rose
      achievement: '#eab308',   // Ochre Gold
      education: '#06b6d4',     // Cyan
      certification: '#14b8a6', // Teal
      opportunity: '#f97316',   // Coral
      document: '#38bdf8',      // Sky
      evidence: '#f43f5e',      // Rose Pink
      goal: '#eab308',          // Gold
      general: '#818cf8',       // Indigo
    },
    edgeColors: {
      POSSESSES_SKILL: '#10b981',
      KNOWS_SKILL: '#10b981',
      BUILT_PROJECT: '#8b5cf6',
      USES_TECH: '#475569',
      WORKED_AT: '#ec4899',
      EARNED_AWARD: '#eab308',
      STUDIED_AT: '#06b6d4',
      SUPPORTED_BY: '#f43f5e',
      TARGETS_GOAL: '#eab308',
      REQUIRES_SKILL: '#06b6d4',
      MATCHES_PROFILE: '#f97316',
      SOURCES_CANDIDATE_DATA: '#38bdf8',
      CONNECTED_TO: '#27272a',
    }
  }
};

const TOPOLOGY_MODES = [
  { id: 'flower', name: '🌸 Radial Flower', desc: 'Central candidate with blooming skill & project petals', icon: Flower2 },
  { id: 'organic', name: '🌐 Organic Constellation', desc: 'Dynamic spring-physics web with live repulsion', icon: Boxes },
  { id: 'tree_td', name: '🌲 Top-Down DAG', desc: 'Structured hierarchy: Candidate at top → Projects & Experience → Skills', icon: GitFork },
  { id: 'tree_bu', name: '⬆️ Bottom-Up Pyramid', desc: 'Foundational skills building up to Candidate apex', icon: AlignVerticalSpaceAround },
];

interface SimulationNode extends LiveGraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  degree: number;
  color: string;
  isDragging?: boolean;
}

interface SimulationEdge {
  id: string;
  source: SimulationNode;
  target: SimulationNode;
  relationship: string;
  weight: number;
  color: string;
}

interface KnowledgeGraphProps {
  height?: string;
  showTitle?: boolean;
  onSelectNode?: (node: LiveGraphNode | null) => void;
}

export default function KnowledgeGraph({
  height = 'h-[680px]',
  showTitle = true,
  onSelectNode
}: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [graphData, setGraphData] = useState<LiveKnowledgeGraph>(generateInitialFallbackGraph);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof THEME_PALETTES>('cyberpunk');
  const [selectedTopology, setSelectedTopology] = useState<string>('flower');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<LiveGraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SimulationNode | null>(null);
  const [physicsPaused, setPhysicsPaused] = useState(false);
  const [copiedExcerpt, setCopiedExcerpt] = useState(false);

  // Viewport Transform (Pan & Zoom)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isPanningRef = useRef(false);
  const startPanRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<SimulationNode | null>(null);

  const theme = THEME_PALETTES[selectedTheme];

  // Load Graph Data from API with seamless fallback
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchKnowledgeGraph();
      if (data && data.nodes && data.nodes.length > 0) {
        setGraphData(data);
      }
    } catch (err) {
      console.warn('[KnowledgeGraph] Live graph API fallback active:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Simulation State Refs
  const simNodesRef = useRef<SimulationNode[]>([]);
  const simEdgesRef = useRef<SimulationEdge[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize Simulation Nodes & Positions
  useEffect(() => {
    if (!graphData) return;

    const width = containerRef.current?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 900);
    const height = containerRef.current?.clientHeight || 650;
    const centerX = width / 2;
    const centerY = height / 2;

    // Build Node Map
    const nodeMap = new Map<string, SimulationNode>();
    const nodeDegrees = new Map<string, number>();

    graphData.edges.forEach((edge) => {
      nodeDegrees.set(edge.source, (nodeDegrees.get(edge.source) || 0) + 1);
      nodeDegrees.set(edge.target, (nodeDegrees.get(edge.target) || 0) + 1);
    });

    graphData.nodes.forEach((n, idx) => {
      const degree = nodeDegrees.get(n.id) || 1;
      let radius = 7 + Math.min(18, degree * 2.2);
      if (n.type === 'user') radius = 28;
      if (n.type === 'goal') radius = 18;
      if (n.type === 'experience' || n.type === 'project') radius = 14;

      const groupType = n.type || 'general';
      const color = theme.nodeColors[groupType as keyof typeof theme.nodeColors] || theme.nodeColors.general;

      // Position based on initial topology mode
      let initX = centerX;
      let initY = centerY;

      if (n.type === 'user') {
        initX = centerX;
        initY = selectedTopology === 'tree_td' ? centerY - 200 : selectedTopology === 'tree_bu' ? centerY + 200 : centerY;
      } else if (selectedTopology === 'flower') {
        const angle = (idx / Math.max(1, graphData.nodes.length - 1)) * Math.PI * 2;
        const dist = n.type === 'goal' ? 120 : n.type === 'skill' ? 180 : n.type === 'evidence' ? 260 : 220;
        initX = centerX + Math.cos(angle) * dist + (Math.random() - 0.5) * 20;
        initY = centerY + Math.sin(angle) * dist + (Math.random() - 0.5) * 20;
      } else if (selectedTopology === 'tree_td') {
        const levelY = n.type === 'goal' ? centerY - 120 : n.type === 'experience' || n.type === 'project' ? centerY - 40 : n.type === 'skill' ? centerY + 60 : centerY + 160;
        const spread = (idx % 12 - 6) * 65;
        initX = centerX + spread;
        initY = levelY;
      } else if (selectedTopology === 'tree_bu') {
        const levelY = n.type === 'skill' ? centerY + 160 : n.type === 'experience' || n.type === 'project' ? centerY + 60 : n.type === 'goal' ? centerY - 60 : centerY - 160;
        const spread = (idx % 12 - 6) * 65;
        initX = centerX + spread;
        initY = levelY;
      } else {
        // Organic random constellation
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 260;
        initX = centerX + Math.cos(angle) * dist;
        initY = centerY + Math.sin(angle) * dist;
      }

      nodeMap.set(n.id, {
        ...n,
        x: initX,
        y: initY,
        vx: 0,
        vy: 0,
        radius,
        degree,
        color
      });
    });

    // Build Edges with direct Node references
    const simEdges: SimulationEdge[] = [];
    graphData.edges.forEach((e) => {
      const srcNode = nodeMap.get(e.source);
      const tgtNode = nodeMap.get(e.target);
      if (srcNode && tgtNode) {
        const edgeColor = theme.edgeColors[e.relationship as keyof typeof theme.edgeColors] || theme.edgeColors.CONNECTED_TO;
        simEdges.push({
          id: e.id,
          source: srcNode,
          target: tgtNode,
          relationship: e.relationship,
          weight: e.weight || 1.0,
          color: edgeColor
        });
      }
    });

    simNodesRef.current = Array.from(nodeMap.values());
    simEdgesRef.current = simEdges;
  }, [graphData, selectedTopology, selectedTheme, theme]);

  // Canvas Resize Handler
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth || 900;
      const height = container.clientHeight || 650;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleOffset = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth || 900;
      const height = container.clientHeight || 650;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = theme.gridColor;
      ctx.lineWidth = 1;
      const gridSize = 40 * transform.scale;
      const offsetX = (transform.x % gridSize);
      const offsetY = (transform.y % gridSize);

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Apply Pan & Zoom Transform
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.scale, transform.scale);

      const nodes = simNodesRef.current;
      const edges = simEdgesRef.current;

      // Physics Step (if not paused)
      if (!physicsPaused) {
        const centerX = width / 2;
        const centerY = height / 2;

        // 1. Repulsion between nodes (Coulomb force)
        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const distSq = dx * dx + dy * dy || 1;
            const dist = Math.sqrt(distSq);
            if (dist < 320) {
              const force = (350 / distSq) * (n1.type === 'user' || n2.type === 'user' ? 2.5 : 1.0);
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              if (!n1.isDragging && n1.type !== 'user') {
                n1.vx -= fx;
                n1.vy -= fy;
              }
              if (!n2.isDragging && n2.type !== 'user') {
                n2.vx += fx;
                n2.vy += fy;
              }
            }
          }
        }

        // 2. Spring Attraction along Edges (Hooke's law)
        for (let k = 0; k < edges.length; k++) {
          const edge = edges[k];
          const src = edge.source;
          const tgt = edge.target;
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = src.type === 'user' || tgt.type === 'user' ? 140 : 90;
          const spring = (dist - targetDist) * 0.025;
          const fx = (dx / dist) * spring;
          const fy = (dy / dist) * spring;

          if (!src.isDragging && src.type !== 'user') {
            src.vx += fx;
            src.vy += fy;
          }
          if (!tgt.isDragging && tgt.type !== 'user') {
            tgt.vx -= fx;
            tgt.vy -= fy;
          }
        }

        // 3. Center Gravity & Damping
        nodes.forEach((node) => {
          if (!node.isDragging) {
            if (node.type !== 'user') {
              const dx = centerX - node.x;
              const dy = centerY - node.y;
              node.vx += dx * 0.0008;
              node.vy += dy * 0.0008;
            }
            node.vx *= 0.88; // Damping
            node.vy *= 0.88;
            node.x += node.vx;
            node.y += node.vy;
          }
        });
      }

      particleOffset = (particleOffset + 0.012) % 1;

      // Filter Visibility
      const isVisible = (node: SimulationNode) => {
        if (selectedGroup !== 'all' && node.type !== selectedGroup && node.type !== 'user') return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return node.label.toLowerCase().includes(q) || (node.category && node.category.toLowerCase().includes(q));
        }
        return true;
      };

      // Draw Edges
      edges.forEach((edge) => {
        const src = edge.source;
        const tgt = edge.target;
        const visible = isVisible(src) && isVisible(tgt);
        const opacity = visible ? (hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id) ? 0.9 : 0.45) : 0.08;

        ctx.strokeStyle = edge.color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id) ? 2.5 : 1.2;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.stroke();

        // Draw animated energy pulse on active visible edges
        if (visible && (edge.relationship === 'POSSESSES_SKILL' || edge.relationship === 'SUPPORTED_BY' || edge.relationship === 'BUILT_PROJECT')) {
          const px = src.x + (tgt.x - src.x) * particleOffset;
          const py = src.y + (tgt.y - src.y) * particleOffset;
          ctx.fillStyle = edge.color;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const visible = isVisible(node);
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const opacity = visible ? 1.0 : 0.15;

        ctx.globalAlpha = opacity;

        // Glowing Aura for selected/hovered nodes
        if (visible && (isHovered || isSelected || node.type === 'user')) {
          ctx.save();
          ctx.shadowColor = node.color;
          ctx.shadowBlur = isSelected ? 24 : isHovered ? 18 : 12;
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + (isSelected ? 4 : isHovered ? 2 : 0), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Inner Circle
        ctx.fillStyle = node.type === 'user' ? '#ffffff' : node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Dark Border Ring
        ctx.strokeStyle = theme.bg;
        ctx.lineWidth = node.type === 'user' ? 3 : 2;
        ctx.stroke();

        // Label Rendering
        if (visible && (transform.scale > 0.65 || node.type === 'user' || isHovered || isSelected)) {
          ctx.font = node.type === 'user' ? 'bold 13px Inter, sans-serif' : '11px Inter, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.shadowColor = 'rgba(0,0,0,0.85)';
          ctx.shadowBlur = 4;
          ctx.fillText(node.label, node.x, node.y + node.radius + 5);

          // Subtext category
          if (node.category && (isHovered || isSelected)) {
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillStyle = node.color;
            ctx.fillText(node.category.toUpperCase(), node.x, node.y + node.radius + 19);
          }
        }
      });

      ctx.restore(); // Restore pan/zoom
      ctx.restore(); // Restore DPI scale

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [theme, transform, physicsPaused, selectedGroup, searchQuery, selectedNode, hoveredNode]);

  // Coordinate Conversion Helper (Screen to World)
  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = (screenX - rect.left - transform.x) / transform.scale;
    const y = (screenY - rect.top - transform.y) / transform.scale;
    return { x, y };
  }, [transform]);

  // Mouse / Touch Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = screenToWorld(e.clientX, e.clientY);
    const clickedNode = simNodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    });

    if (clickedNode) {
      draggedNodeRef.current = clickedNode;
      clickedNode.isDragging = true;
      setSelectedNode(clickedNode);
      if (onSelectNode) onSelectNode(clickedNode);
    } else {
      isPanningRef.current = true;
      startPanRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNodeRef.current) {
      const { x, y } = screenToWorld(e.clientX, e.clientY);
      draggedNodeRef.current.x = x;
      draggedNodeRef.current.y = y;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else if (isPanningRef.current) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - startPanRef.current.x,
        y: e.clientY - startPanRef.current.y
      }));
    } else {
      // Hover Detection
      const { x, y } = screenToWorld(e.clientX, e.clientY);
      const hovered = simNodesRef.current.find((n) => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
      });
      setHoveredNode(hovered || null);
    }
  };

  const handleMouseUp = () => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.isDragging = false;
      draggedNodeRef.current = null;
    }
    isPanningRef.current = false;
  };

  // Non-passive Wheel Zoom Listener to avoid React passive event warnings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      const newScale = Math.max(0.3, Math.min(3.5, transform.scale * zoomFactor));

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setTransform((prev) => ({
        scale: newScale,
        x: mouseX - (mouseX - prev.x) * (newScale / prev.scale),
        y: mouseY - (mouseY - prev.y) * (newScale / prev.scale)
      }));
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [transform.scale]);

  const fitToScreen = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  const handleZoom = (delta: number) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.3, Math.min(3.5, prev.scale + delta))
    }));
  };

  const handleCopyExcerpt = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedExcerpt(true);
    setTimeout(() => setCopiedExcerpt(false), 2000);
  };

  // Connected Neighbors for Selected Node
  const neighborInfo = useMemo(() => {
    if (!selectedNode || !graphData) return [];
    const neighbors: { edgeType: string; node: LiveGraphNode }[] = [];
    graphData.edges.forEach((e) => {
      if (e.source === selectedNode.id) {
        const targetNode = graphData.nodes.find((n) => n.id === e.target);
        if (targetNode) neighbors.push({ edgeType: e.relationship, node: targetNode });
      } else if (e.target === selectedNode.id) {
        const sourceNode = graphData.nodes.find((n) => n.id === e.source);
        if (sourceNode) neighbors.push({ edgeType: e.relationship, node: sourceNode });
      }
    });
    return neighbors;
  }, [selectedNode, graphData]);

  return (
    <div ref={containerRef} className={`relative w-full ${height} rounded-2xl overflow-hidden border border-slate-800 bg-[#030712] shadow-2xl flex flex-col`}>
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-auto">
        {/* Left: Search & Filters */}
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search graph nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-36 sm:w-48 font-mono"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-4 w-px bg-slate-700" />

          {/* Group Filter Pills */}
          <div className="hidden lg:flex items-center gap-1 text-[11px]">
            {['all', 'skill', 'experience', 'project', 'evidence', 'opportunity'].map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-2 py-0.5 rounded-md font-medium capitalize transition-colors ${
                  selectedGroup === grp
                    ? 'bg-primary text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {grp === 'all' ? 'All' : grp}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Telemetry & Graph Actions */}
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-xs">
          {/* Readiness Telemetry Badge */}
          {graphData?.metrics && (
            <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
              <span className="text-[11px] text-slate-400 font-mono">Nodes:</span>
              <span className="font-bold text-cyan-400 font-mono">{graphData.metrics.nodes_count}</span>
              <span className="text-[11px] text-slate-400 font-mono">Readiness:</span>
              <span className="font-bold text-emerald-400 font-mono">{graphData.metrics.readiness_score}%</span>
            </div>
          )}

          {/* Topology Switcher */}
          <select
            value={selectedTopology}
            onChange={(e) => setSelectedTopology(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded-lg border border-slate-700 focus:outline-none cursor-pointer"
          >
            {TOPOLOGY_MODES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* Theme Palette */}
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value as keyof typeof THEME_PALETTES)}
            className="bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded-lg border border-slate-700 focus:outline-none cursor-pointer"
          >
            {Object.values(THEME_PALETTES).map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Physics Pause / Play */}
          <button
            onClick={() => setPhysicsPaused(!physicsPaused)}
            title={physicsPaused ? 'Resume Physics' : 'Freeze Physics'}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {physicsPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Zoom In / Out / Fit */}
          <button
            onClick={() => handleZoom(0.2)}
            title="Zoom In"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.2)}
            title="Zoom Out"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={fitToScreen}
            title="Fit to Screen"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={loadData}
            title="Refresh Graph"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Floating Node Inspector & Vector Grounding Provenance Card */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/80 p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: theme.nodeColors[selectedNode.type as keyof typeof theme.nodeColors] || '#6366f1' }}
              >
                {selectedNode.type === 'skill' ? (
                  <Code className="w-5 h-5" />
                ) : selectedNode.type === 'project' ? (
                  <Cpu className="w-5 h-5" />
                ) : selectedNode.type === 'experience' ? (
                  <Briefcase className="w-5 h-5" />
                ) : selectedNode.type === 'evidence' ? (
                  <Award className="w-5 h-5" />
                ) : selectedNode.type === 'opportunity' ? (
                  <Target className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">{selectedNode.label}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold">
                    {selectedNode.type}
                  </span>
                  {selectedNode.category && (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-[10px]">
                      {selectedNode.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedNode.properties?.headline || selectedNode.properties?.description || selectedNode.properties?.metric_proof || 'Knowledge Graph topological entity'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedNode(null)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Two-Column Deep Inspector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
            {/* Left Col: Connected Neighbors & Quick Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Connected Neighbors ({neighborInfo.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {neighborInfo.map((nbr, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedNode(nbr.node)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.nodeColors[nbr.node.type as keyof typeof theme.nodeColors] || '#6366f1' }}
                    />
                    <span className="font-semibold truncate max-w-[140px]">{nbr.node.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({nbr.edgeType})</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <Link
                  href={`/resume?focus=${encodeURIComponent(selectedNode.label)}`}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Tailor Resume</span>
                </Link>
                <Link
                  href={`/interview-arena?topic=${encodeURIComponent(selectedNode.label)}`}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Simulate Interview</span>
                </Link>
              </div>
            </div>

            {/* Right Col: RAG Vector Grounding Citation Provenance */}
            <div className="bg-slate-950/80 rounded-xl p-3 border border-indigo-500/30 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    <Database className="w-3.5 h-3.5" />
                    <span>Vector Search Provenance</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-cyan-300 font-mono text-[9px] font-bold border border-cyan-500/20">
                    {selectedNode.vector_reference?.embedding_model || 'text-embedding-004 (768-dim)'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <p>
                    <span className="text-slate-500">Source: </span>
                    <span className="font-semibold text-slate-200">{selectedNode.vector_reference?.source_doc || 'Master Golden Resume'}</span>
                    <span className="text-slate-500"> • Chunk: </span>
                    <span className="font-mono text-cyan-400">#{selectedNode.vector_reference?.chunk_index ?? 0}</span>
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-slate-300 italic text-[11px] leading-relaxed line-clamp-3">
                  "{selectedNode.vector_reference?.chunk_excerpt || `Grounding evidence verified in candidate database for ${selectedNode.label}.`}"
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-slate-400">Cosine Match:</span>
                  <span className="font-bold text-emerald-400">{selectedNode.vector_reference?.similarity_score || 96.4}%</span>
                </div>
                <button
                  onClick={() => handleCopyExcerpt(selectedNode.vector_reference?.chunk_excerpt || '')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedExcerpt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedExcerpt ? 'Copied' : 'Copy Excerpt'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Fallback Initial Graph Structure for Fresh Accounts
function generateInitialFallbackGraph(): LiveKnowledgeGraph {
  return {
    nodes: [
      { id: 'user_cand', label: 'Candidate Persona', type: 'user', category: 'Identity', weight: 1.0, properties: { headline: 'Distributed Systems & AI Engineer' }, vector_reference: { source_doc: 'Master Profile', chunk_index: 0, chunk_excerpt: 'Systems engineer specializing in high-throughput architectures and AI reasoning pipelines.', similarity_score: 98.2, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'goal_ai', label: 'AI Infrastructure Engineer', type: 'goal', category: 'Career Target', weight: 1.0, properties: {}, vector_reference: { source_doc: 'Target Spec', chunk_index: 0, chunk_excerpt: 'Targeting Senior AI Infrastructure and Distributed Systems engineering roles.', similarity_score: 96.0, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'skill_python', label: 'Python & AsyncIO', type: 'skill', category: 'Languages', weight: 0.95, properties: { proficiency: 95 }, vector_reference: { source_doc: 'Resume Skills', chunk_index: 1, chunk_excerpt: 'Architected async FastAPI microservices handling 10k+ QPS with zero data loss.', similarity_score: 97.4, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'skill_distributed', label: 'Distributed Systems', type: 'skill', category: 'Architecture', weight: 0.9, properties: { proficiency: 90 }, vector_reference: { source_doc: 'Resume Experience', chunk_index: 2, chunk_excerpt: 'Engineered consensus algorithms, distributed queues, and partition-tolerant databases.', similarity_score: 95.8, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'skill_pytorch', label: 'PyTorch & vLLM', type: 'skill', category: 'AI & ML', weight: 0.88, properties: { proficiency: 88 }, vector_reference: { source_doc: 'AI Vault', chunk_index: 3, chunk_excerpt: 'Benchmarked vLLM inference engine reducing P99 latency by 42%.', similarity_score: 98.1, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'skill_postgres', label: 'PostgreSQL & Supabase', type: 'skill', category: 'Databases', weight: 0.92, properties: { proficiency: 92 }, vector_reference: { source_doc: 'Database Architecture', chunk_index: 4, chunk_excerpt: 'Designed normalized relational schema with pgvector indexing and RLS security.', similarity_score: 96.5, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'ev_ast_proof', label: 'AST Deterministic Proof #482', type: 'evidence', category: 'GitHub', weight: 0.98, properties: { platform: 'GitHub', metric_proof: 'Merged PR #482 across 14 modules with 100% test coverage.' }, vector_reference: { source_doc: 'GitHub Audit Trail', chunk_index: 5, chunk_excerpt: 'Cryptographic SHA-256 verification of 1,420 lines of kernel code.', similarity_score: 99.1, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'proj_careeros', label: 'CareerOS Neural Engine', type: 'project', category: 'Technical Projects', weight: 0.9, properties: { description: 'Autonomous agentic career intelligence platform.' }, vector_reference: { source_doc: 'Projects Portfolio', chunk_index: 6, chunk_excerpt: 'Engineered graph RAG and candidate vector matching engine in Next.js and FastAPI.', similarity_score: 98.5, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
      { id: 'exp_lead', label: 'Staff Systems Architect', type: 'experience', category: 'Work Experience', weight: 0.9, properties: { company: 'Autonomous Labs', role: 'Staff Engineer' }, vector_reference: { source_doc: 'Work History', chunk_index: 7, chunk_excerpt: 'Led engineering team delivering enterprise-grade real-time streaming architectures.', similarity_score: 94.9, embedding_model: 'text-embedding-004 (Gemini 768-dim)' } },
    ],
    edges: [
      { id: 'e1', source: 'user_cand', target: 'goal_ai', relationship: 'TARGETS_GOAL', weight: 1.0 },
      { id: 'e2', source: 'user_cand', target: 'skill_python', relationship: 'POSSESSES_SKILL', weight: 0.95 },
      { id: 'e3', source: 'user_cand', target: 'skill_distributed', relationship: 'POSSESSES_SKILL', weight: 0.9 },
      { id: 'e4', source: 'user_cand', target: 'skill_pytorch', relationship: 'POSSESSES_SKILL', weight: 0.88 },
      { id: 'e5', source: 'user_cand', target: 'skill_postgres', relationship: 'POSSESSES_SKILL', weight: 0.92 },
      { id: 'e6', source: 'skill_python', target: 'ev_ast_proof', relationship: 'SUPPORTED_BY', weight: 1.0 },
      { id: 'e7', source: 'user_cand', target: 'proj_careeros', relationship: 'BUILT_PROJECT', weight: 1.0 },
      { id: 'e8', source: 'user_cand', target: 'exp_lead', relationship: 'WORKED_AT', weight: 1.0 },
      { id: 'e9', source: 'goal_ai', target: 'skill_distributed', relationship: 'REQUIRES_SKILL', weight: 0.85 },
      { id: 'e10', source: 'goal_ai', target: 'skill_pytorch', relationship: 'REQUIRES_SKILL', weight: 0.9 },
    ],
    metrics: {
      nodes_count: 9,
      edges_count: 10,
      skills_count: 4,
      evidence_count: 1,
      verified_evidence_count: 1,
      readiness_score: 94.2,
      evidence_coverage_ratio: 0.75,
      core_pillars: ['AI & ML', 'Distributed Systems', 'Architecture', 'Databases'],
      top_central_skills: ['Python & AsyncIO', 'Distributed Systems', 'PyTorch & vLLM', 'PostgreSQL & Supabase']
    },
    skill_clusters: {
      'Languages': ['Python & AsyncIO'],
      'Architecture': ['Distributed Systems'],
      'AI & ML': ['PyTorch & vLLM'],
      'Databases': ['PostgreSQL & Supabase']
    }
  };
}
