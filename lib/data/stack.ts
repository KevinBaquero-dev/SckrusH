export type StackItem = {
  name: string
  descriptor?: string
}

export type StackCategory = {
  id: string
  label: string
  /** Optional category-level description — used only for AI Workflow */
  categoryDescriptor?: string
  items: StackItem[]
  /** Triggers border-top visual treatment */
  aiLayer?: boolean
}

// Order matters: Frontend → Backend → Tools → AI Workflow (intentional read order)
export const stackCategories: StackCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'Next.js',       descriptor: 'framework principal'        },
      { name: 'TypeScript',    descriptor: 'base de todo el código'     },
      { name: 'Tailwind CSS',  descriptor: 'sistema de estilos'         },
      { name: 'Framer Motion', descriptor: 'animaciones e interacción'  },
      { name: 'React',         descriptor: 'componentes y estado'       },
    ],
  },
  {
    id: 'backend',
    label: 'Backend / Systems',
    items: [
      { name: 'Node.js',    descriptor: 'APIs y servicios'           },
      { name: 'PostgreSQL', descriptor: 'base de datos relacional'   },
      { name: 'Prisma',     descriptor: 'ORM y migraciones'          },
      { name: 'REST APIs',  descriptor: 'integración de servicios'   },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git / GitHub', descriptor: 'control de versiones'  },
      { name: 'Vercel',       descriptor: 'deploy y CI/CD'         },
      { name: 'Figma',        descriptor: 'diseño y prototipos'    },
      { name: 'VS Code',      descriptor: 'entorno de desarrollo'  },
    ],
  },
  {
    id: 'ai-workflow',
    label: 'AI Workflow',
    categoryDescriptor:
      'Integro herramientas de IA como capa de aceleración — para iterar más rápido y tomar decisiones con más contexto.',
    aiLayer: true,
    items: [
      { name: 'Claude Code' },
      { name: 'ChatGPT'     },
      { name: 'ElevenLabs'  },
      { name: 'OpenClaw'    },
    ],
  },
]
