import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [devoirs, setDevoirs] = useState([])

  useEffect(() => {
    async function fetchDevoirs() {
      const { data } = await supabase.from('devoirs').select('*').order('id', { ascending: false })
      if (data) setDevoirs(data)
    }
    fetchDevoirs()
  }, [])

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#1a73e8' }}>📅 Mon Planning de Devoirs</h1>
      <div style={{ maxWidth: '800px', margin: '20px auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#1a73e8', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Matière</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Devoir</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {devoirs.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{d.matiere}</td>
                <td style={{ padding: '15px' }}>{d.titre}</td>
                <td style={{ padding: '15px', color: '#666' }}>{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
