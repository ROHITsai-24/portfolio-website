'use client'

import { useState } from 'react'
import { Topbar } from '@/components/dashboard/topbar'
import { Label } from '@/components/primitives/label'
import { Pill } from '@/components/primitives/pill'
import { Chip } from '@/components/primitives/chip'
import { SectionHead } from '@/components/primitives/section-head'
import { cn } from '@/lib/utils'

type Priority = 'high' | 'med' | 'low'
type TaskStatus = 'open' | 'done'
type FilterType = 'All active' | 'Open' | 'Done' | 'High priority'

interface Task {
  id: string
  title: string
  tags: string[]
  project: string
  status: TaskStatus
  due: string
  priority: Priority
  done: boolean
}

const TASKS: Task[] = [
  {
    id: 't1',
    title: 'Write case study intro for Halftone',
    tags: ['writing', 'portfolio'],
    project: 'Halftone',
    status: 'open',
    due: 'Today',
    priority: 'high',
    done: false,
  },
  {
    id: 't2',
    title: 'Reply to Aanya re: studio collab',
    tags: ['messages'],
    project: '—',
    status: 'open',
    due: 'Today',
    priority: 'high',
    done: false,
  },
  {
    id: 't3',
    title: 'Fix gallery layout on mobile — Loom Ledger',
    tags: ['bug', 'loom'],
    project: 'Loom Ledger',
    status: 'open',
    due: 'Tue',
    priority: 'high',
    done: false,
  },
  {
    id: 't4',
    title: 'Refactor projects RLS policy',
    tags: ['infra', 'supabase'],
    project: '—',
    status: 'open',
    due: 'Wed',
    priority: 'med',
    done: false,
  },
  {
    id: 't5',
    title: 'Add dark mode to Quietframe landing',
    tags: ['design', 'quietframe'],
    project: 'Quietframe',
    status: 'open',
    due: 'Thu',
    priority: 'med',
    done: false,
  },
  {
    id: 't6',
    title: 'Draft Speaking at Design Week blog post',
    tags: ['writing'],
    project: '—',
    status: 'open',
    due: 'Fri',
    priority: 'med',
    done: false,
  },
  {
    id: 't7',
    title: 'Take new portrait — golden hour',
    tags: ['personal'],
    project: '—',
    status: 'open',
    due: 'Fri',
    priority: 'low',
    done: false,
  },
  {
    id: 't8',
    title: 'Set up Vercel preview deploys for Daylog v2',
    tags: ['infra'],
    project: 'Daylog v2',
    status: 'open',
    due: 'Next week',
    priority: 'low',
    done: false,
  },
  {
    id: 't9',
    title: 'Review North Star iOS TestFlight feedback',
    tags: ['product'],
    project: 'North Star',
    status: 'open',
    due: 'Next week',
    priority: 'low',
    done: false,
  },
  {
    id: 't10',
    title: 'Replace cover image — Quietframe',
    tags: ['media', 'quietframe'],
    project: 'Quietframe',
    status: 'done',
    due: 'Yesterday',
    priority: 'med',
    done: true,
  },
  {
    id: 't11',
    title: 'Publish Halftone to public',
    tags: ['portfolio'],
    project: 'Halftone',
    status: 'done',
    due: 'Yesterday',
    priority: 'high',
    done: true,
  },
  {
    id: 't12',
    title: 'Set up Supabase RLS for messages table',
    tags: ['infra', 'supabase'],
    project: '—',
    status: 'done',
    due: 'Mon',
    priority: 'high',
    done: true,
  },
  {
    id: 't13',
    title: 'Write bio copy for About page',
    tags: ['writing'],
    project: '—',
    status: 'done',
    due: 'Mon',
    priority: 'low',
    done: true,
  },
  {
    id: 't14',
    title: 'Add CloudKit sync to North Star',
    tags: ['ios'],
    project: 'North Star',
    status: 'done',
    due: 'Last week',
    priority: 'high',
    done: true,
  },
  {
    id: 't15',
    title: 'Configure Cloudflare Turnstile on contact form',
    tags: ['infra'],
    project: '—',
    status: 'done',
    due: 'Last week',
    priority: 'med',
    done: true,
  },
]

const priorityColor: Record<Priority, string> = {
  high: 'var(--danger)',
  med: 'var(--warn)',
  low: 'var(--ink-4)',
}

const statusVariant: Record<TaskStatus, 'draft' | 'completed'> = {
  open: 'draft',
  done: 'completed',
}

function TaskRow({
  task,
  onToggle,
}: {
  task: Task
  onToggle: (id: string) => void
}) {
  return (
    <div
      className={cn(
        'grid items-center gap-2 py-3 border-b border-[var(--rule-2)] group hover:bg-[var(--paper-2)] px-1 rounded-sm transition-colors',
        task.done && 'opacity-60',
      )}
      style={{ gridTemplateColumns: '24px 1fr 120px 100px 80px 24px' }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          'w-[18px] h-[18px] rounded-sm border flex items-center justify-center text-[10px] flex-shrink-0 bg-transparent cursor-pointer transition-colors',
          task.done
            ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]'
            : 'border-[var(--ink-3)] text-transparent hover:border-[var(--ink)]',
        )}
      >
        ✓
      </button>

      {/* Title + tags */}
      <div className="min-w-0">
        <div
          className={cn(
            'text-[13px] text-[var(--ink)] truncate',
            task.done && 'line-through text-[var(--ink-4)]',
          )}
        >
          {task.title}
        </div>
        {task.tags.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {task.tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] text-[var(--ink-4)]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Project */}
      <span className="font-mono text-[10px] text-[var(--ink-3)] truncate">{task.project}</span>

      {/* Status */}
      <Pill variant={statusVariant[task.status]}>
        {task.status === 'done' ? 'Done' : 'Open'}
      </Pill>

      {/* Due */}
      <span
        className={cn(
          'font-mono text-[10px]',
          task.due === 'Today' || task.due === 'Yesterday'
            ? 'text-[var(--warn)]'
            : 'text-[var(--ink-3)]',
        )}
      >
        {task.due}
      </span>

      {/* Priority dot */}
      <span
        className="w-2 h-2 rounded-full block mx-auto"
        style={{ background: priorityColor[task.priority] }}
        title={task.priority}
      />
    </div>
  )
}

type FilterOpt = 'All active' | 'Open' | 'Done' | 'High priority'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(TASKS)
  const [filter, setFilter] = useState<FilterOpt>('All active')
  const [quickAdd, setQuickAdd] = useState('')

  const openCount = tasks.filter((t) => !t.done).length
  const dueThisWeek = tasks.filter(
    (t) => !t.done && ['Today', 'Tue', 'Wed', 'Thu', 'Fri'].includes(t.due),
  ).length
  const doneCount = tasks.filter((t) => t.done).length

  const toggleDone = (id: string) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done, status: !t.done ? 'done' : 'open' } : t,
      ),
    )

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && quickAdd.trim()) {
      const newTask: Task = {
        id: `t${Date.now()}`,
        title: quickAdd.trim(),
        tags: [],
        project: '—',
        status: 'open',
        due: 'No date',
        priority: 'med',
        done: false,
      }
      setTasks((prev) => [newTask, ...prev])
      setQuickAdd('')
    }
  }

  const applyFilter = (t: Task) => {
    if (filter === 'Open') return !t.done
    if (filter === 'Done') return t.done
    if (filter === 'High priority') return t.priority === 'high' && !t.done
    return true // All active includes done too
  }

  const filtered = tasks.filter(applyFilter)

  const todayTasks = filtered.filter(
    (t) => !t.done && t.due === 'Today',
  )
  const weekTasks = filtered.filter(
    (t) => !t.done && ['Tue', 'Wed', 'Thu', 'Fri'].includes(t.due),
  )
  const laterTasks = filtered.filter(
    (t) =>
      !t.done &&
      !['Today', 'Tue', 'Wed', 'Thu', 'Fri'].includes(t.due),
  )
  const doneTasks = filtered.filter((t) => t.done)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        crumbs={['Personal', 'Tasks']}
        actions={
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-[12px] font-medium transition-all hover:-translate-y-px">
            + New task
          </button>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h1
                className="font-serif text-[48px] m-0 mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                Tasks
              </h1>
              <p className="font-mono text-[12px] text-[var(--ink-3)] m-0">
                {openCount} open · {dueThisWeek} due this week · {doneCount} completed
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              {(['All active', 'Open', 'Done', 'High priority'] as FilterOpt[]).map((f) => (
                <Chip
                  key={f}
                  as="button"
                  solid={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Chip>
              ))}
            </div>
          </div>

          {/* Quick-add row */}
          <div className="border border-dashed border-[var(--rule)] rounded-md p-3 flex gap-3 items-center mb-10">
            <span className="w-[18px] h-[18px] rounded-sm border border-[var(--rule)] flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-sm border border-[var(--ink-4)]" />
            </span>
            <input
              value={quickAdd}
              onChange={(e) => setQuickAdd(e.target.value)}
              onKeyDown={addTask}
              placeholder="Add a task…"
              className="flex-1 text-[13px] bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--ink-4)]"
            />
            <span className="font-mono text-[10px] text-[var(--ink-4)] shrink-0">↵ to save</span>
          </div>

          {/* ── Today ──────────────────────────────────────────── */}
          {todayTasks.length > 0 && (
            <div className="mb-8">
              <SectionHead
                label="Today"
                right={
                  <span className="font-mono text-[10px] text-[var(--ink-3)]">
                    {todayTasks.length}
                  </span>
                }
              />
              {todayTasks.map((t) => (
                <TaskRow key={t.id} task={t} onToggle={toggleDone} />
              ))}
            </div>
          )}

          {/* ── This week ──────────────────────────────────────── */}
          {weekTasks.length > 0 && (
            <div className="mb-8">
              <SectionHead
                label="This week"
                right={
                  <span className="font-mono text-[10px] text-[var(--ink-3)]">
                    {weekTasks.length}
                  </span>
                }
              />
              {weekTasks.map((t) => (
                <TaskRow key={t.id} task={t} onToggle={toggleDone} />
              ))}
            </div>
          )}

          {/* ── Later ──────────────────────────────────────────── */}
          {laterTasks.length > 0 && (
            <div className="mb-8">
              <SectionHead
                label="Later"
                right={
                  <span className="font-mono text-[10px] text-[var(--ink-3)]">
                    {laterTasks.length}
                  </span>
                }
              />
              {laterTasks.map((t) => (
                <TaskRow key={t.id} task={t} onToggle={toggleDone} />
              ))}
            </div>
          )}

          {/* ── Done ───────────────────────────────────────────── */}
          {doneTasks.length > 0 && (
            <div className="mb-8">
              <SectionHead
                label="Done"
                right={
                  <span className="font-mono text-[10px] text-[var(--ink-3)]">
                    {doneTasks.length}
                  </span>
                }
              />
              {doneTasks.map((t) => (
                <TaskRow key={t.id} task={t} onToggle={toggleDone} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="font-mono text-[11px] text-[var(--ink-4)] uppercase tracking-[0.14em]">
                No tasks match this filter
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
