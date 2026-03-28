import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [devoirs, setDevoirs] = useState([])

  useEffect(() => {
    const fetchDevoirs = async () => {
      const { data } = await supabase
        .from('devoirs')
        .select('*')
        .order('id', { ascending: false })
      if (data) setDevoirs(data)
    }
    fetchDevoirs()
  }, [])

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>📚 Mes Devoirs Pronote</h1>
      
      <div style={{ maxWidth: '900px', margin: '20px auto', background: 'white', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Matière</th>
              <th style={{ padding: '12px' }}>Devoir</th>
              <th style={{ padding: '12px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {devoirs.map((devoir) => (
              <tr key={devoir.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#3498db' }}>{devoir.matiere}</td>
                <td style={{ padding: '12px' }}>{devoir.titre}</td>
                <td style={{ padding: '12px', color: '#95a5a6' }}>{devoir.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {devoirs.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>Chargement ou aucun devoir trouvé...</p>}
      </div>
    </div>
  )
}
