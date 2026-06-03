import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  applyNewness,
  loadPublicTenderSnapshot,
  savePublicTenderSnapshot,
  sortTendersNewestFirst,
} from '@/lib/tender-newness'

export interface Tender {
  id: string
  title: string
  description: string
  publishedDate: string
  deadline: string | null
  value: string | null
  location: string | null
  organisation: string | null
  status: string
  url: string
  source: 'Contracts Finder' | 'Find a Tender'
  /** Set when published from the admin portal with a category tag. */
  category?: string | null
  published_at?: string | null
  /** Not in the previous list fetch (since last refresh). */
  isNew?: boolean
}

interface TendersState {
  items: Tender[]
  loading: boolean
  error: string | null
  category: string
  source: string
  page: number
  lastFetchKey: string | null
  snapshotIds: string[]
  hasLoadedBefore: boolean
  newCount: number
}

const initialState: TendersState = {
  items: [],
  loading: false,
  error: null,
  category: '',
  source: 'all',
  page: 1,
  lastFetchKey: null,
  snapshotIds: [],
  hasLoadedBefore: false,
  newCount: 0,
}

export const fetchTenders = createAsyncThunk(
  'tenders/fetch',
  async ({ source }: { source: string }) => {
    const params = new URLSearchParams({ source })
    const res = await fetch(`/api/tenders?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch tenders')
    const data = await res.json()
    return data.tenders as Tender[]
  }
)

const tendersSlice = createSlice({
  name: 'tenders',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
      state.page = 1
    },
    setSource(state, action: PayloadAction<string>) {
      state.source = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    clearCache(state) {
      state.lastFetchKey = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTenders.fulfilled, (state, action) => {
        const sorted = sortTendersNewestFirst(action.payload, 'curated')
        const prior = loadPublicTenderSnapshot(state.source)
        const { tenders, snapshot, newCount } = applyNewness(
          sorted,
          prior.ids,
          prior.hasLoadedBefore,
        )
        state.items = tenders
        state.newCount = newCount
        state.snapshotIds = snapshot
        state.hasLoadedBefore = true
        savePublicTenderSnapshot(snapshot, state.source)
        state.loading = false
        state.lastFetchKey = state.source
      })
      .addCase(fetchTenders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch'
      })
  },
})

export const { setCategory, setSource, setPage, clearCache } = tendersSlice.actions
export default tendersSlice.reducer
