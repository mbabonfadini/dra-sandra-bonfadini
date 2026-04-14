export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: ({ email, password }: any) => Promise.resolve({ data: { user: { email } }, error: null }),
    signOut: () => Promise.resolve({ error: null })
  },
  from: (table: string) => ({
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    select: (query?: string) => Promise.resolve({ data: [], error: null }),
    update: (data: any) => ({
      eq: (col: string, val: any) => Promise.resolve({ data: null, error: null })
    }),
    delete: () => ({
      eq: (col: string, val: any) => Promise.resolve({ data: null, error: null })
    })
  })
} as any;
