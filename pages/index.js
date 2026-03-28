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
      const { data, error } = await supabase
        .from('devoirs')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) {
        console.error("Erreur Supabase:", error)
      } else {
        setDevoirs(data || [])
      }
    }
    fetchDevoirs()
  }, [])

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#1a73e8' }}>📅 Mon Planning de Devoirs</h1>
      
      <div style={{ maxWidth: '800px', margin: '20px auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a73e8', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Matière</th>
              <th style={{ padding: '15px' }}>Devoir</th>
              <th style={{ padding: '15px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {devoirs.length > 0 ? (
              devoirs.map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{d.matiere}</td>
                  <td style={{ padding: '15px' }}>{d.titre}</td>
                  <td style={{ padding: '15px', color: '#666' }}>{d.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: '#999' }}>
                  Aucun devoir trouvé. Ajoute-en un depuis Pronote !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
