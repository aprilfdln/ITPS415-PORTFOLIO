import { useState } from 'react'
import d from './data.js'

const yr = v => (v ? new Date(v).getFullYear() : '')

const Icon = ({ name }) => {
  const p = { viewBox: '0 0 24 24', width: 22, height: 22, 'aria-hidden': true }
  if (name === 'github') return <svg {...p} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
  if (name === 'facebook') return <svg {...p} fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8h3.2z" /></svg>
  if (name === 'instagram') return <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
  return <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1" /></svg>
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="sec">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export default function App() {
  const p = d.profile.find(x => x.is_public)
  const [sent, setSent] = useState(false)
  if (!p) return <main className="empty"><h1>No public profile yet</h1><p>Set is_public to true on a profile row in src/data.js.</p></main>

  const own = rows => rows.filter(r => r.profile_id === p.profile_id)
  const user = d.users.find(u => u.user_id === p.user_id)
  const skills = [...own(d.skills)].sort((a, b) => a.year_acquired - b.year_acquired)
  const projects = [...own(d.project)].sort((a, b) => b.is_featured - a.is_featured)
  const views = own(d.analytic).reduce((s, a) => s + (a.viewers_count || 0), 0)
  const kind = own(d.contact_messages).filter(m => m.is_read)
  const name = [p.first_name, p.middle_name, p.last_name].filter(Boolean).join(' ')
  const skillsOf = id => d.project_skills.filter(x => x.project_id === id)
    .map(x => d.skills.find(s => s.skill_id === x.skill_id)).filter(Boolean)
  const mediaOf = id => d.project_media.filter(m => m.project_id === id && m.media_url)
    .sort((a, b) => a.display_order - b.display_order)

  const onSubmit = e => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    const body = `${f.message}\n\n${f.sender_name} <${f.sender_email}>`
    window.location.href = `mailto:${user.email}?subject=${encodeURIComponent(f.subject || 'Hello')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const nav = ['projects', 'skills', 'background', 'contact']
  return (
    <>
      <header className="top">
        <a href="#top" className="mark">{p.first_name}</a>
        <nav>{nav.map(s => <a key={s} href={`#${s}`}>{s[0].toUpperCase() + s.slice(1)}</a>)}</nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="role">{d.meta.title}</p>
          <h1>{name}</h1>
          <p className="lede">{p.bio}</p>

          {/* <ul className="social">
            {own(d.social_links).map(l => (
              <li key={l.social_link_id}>
                <a href={l.url} target="_blank" rel="noreferrer" aria-label={`${l.platform}, ${l.username}`} title={`${l.platform}: ${l.username}`}>
                  <Icon name={l.platform.toLowerCase()} />
                </a>
              </li>
            ))}
          </ul> */}

          {/* <dl className="facts">
            <div><dt>Projects</dt><dd>{projects.length}</dd></div>
            <div><dt>Skills</dt><dd>{skills.length}</dd></div>
            <div><dt>Profile views</dt><dd>{views}</dd></div>
          </dl> */}
        </section>

        <Section id="projects" title="Projects">
          <div className="projects">
            {projects.map(pr => (
              <article key={pr.project_id} className={pr.is_featured ? 'proj featured' : 'proj'}>
                {mediaOf(pr.project_id).map(m => <img key={m.project_media_id} src={m.media_url} alt={`${pr.title} screenshot`} />)}
                <h3>{pr.title}{pr.is_featured && <span className="badge">Featured</span>}</h3>
                <p>{pr.description}</p>
                <ul className="tags">{skillsOf(pr.project_id).map(s => <li key={s.skill_id}>{s.category}</li>)}</ul>
               
               {/* ITTO AY DUN SA TABLE NG PROEJCT LINK */}
                {/* {pr.demo_url && (
                  <a className="btn" href={pr.demo_url} target="_blank" rel="noreferrer">
                    {pr.demo_url.includes('github.com') ? 'View on GitHub' : 'View live demo'}
                  </a>
                )} */}


              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <ul className="skills">
            {skills.map(s => (
              <li key={s.skill_id}>
                <strong>{s.category}</strong>
                <span>Since {s.year_acquired}</span>
                {s.certification_taken && <span className="badge">Certified</span>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="background" title="Background">
          <div className="cols">
            <div>
              <h3>Education</h3>
              {own(d.education).map(e => (
                <div className="item" key={e.education_id}>
                  <b>{e.school_name}</b>
                  <span>{[e.degree, e.field_of_study].filter(Boolean).join(' in ')}</span>
                  <span>{e.start_year} to {e.end_year ?? 'present'}</span>
                  {e.description && <p>{e.description}</p>}
                </div>
              ))}
              <h3>Achievements</h3>
              {own(d.achievements).map(a => (
                <div className="item" key={a.achievement_id}>
                  <b>{a.achievement_name}</b>
                  <span>{[a.issuer, yr(a.date_received)].filter(Boolean).join(', ')}</span>
                  {/* {a.proof_url && <a href={a.proof_url} target="_blank" rel="noreferrer">See proof</a>} */}
                </div>
              ))}
            </div>
            <div>
              <h3>Activities</h3>
              <ol className="timeline">
                {[...own(d.activities)].sort((a, b) => new Date(b.start_date) - new Date(a.start_date)).map(a => (
                  <li key={a.activity_id}>
                    <b>{a.activity_name}</b>
                    <span>{[a.role, a.organization].filter(Boolean).join(' at ')}</span>
                    <span>{yr(a.start_date)} to {a.is_ongoing ? 'present' : yr(a.end_date)}</span>
                    <p>{a.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact Me">
          <div className="kind">
            {kind.length ? kind.map(m => (
              <blockquote key={m.message_id}>
                <p>{m.message}</p>
                <footer>{m.sender_name.split(' ')[0]}{m.subject ? `, ${m.subject}` : ''}</footer>
              </blockquote>
            )) : <p className="mute">No public messages yet. Yours could be the first.</p>}
          </div>
          {sent ? <p className="lede">Your email app should have opened with the message ready to send.</p> : (
            <form onSubmit={onSubmit}>
              <label>Name<input name="sender_name" required /></label>
              <label>Email<input name="sender_email" type="email" required /></label>
              <label className="wide">Subject<input name="subject" /></label>
              <label className="wide">Message<textarea name="message" rows="5" required /></label>
              <button className="btn" type="submit">Send message</button>
            </form>
          )}
        </Section>
        <dl className="facts">
          <div>
            <dt>Projects</dt>
            <dd>{projects.length}</dd>
          </div>

          <div>
            <dt>Skills</dt>
            <dd>{skills.length}</dd>
          </div>

          <div>
            <dt>Profile views</dt>
            <dd>{views}</dd>
          </div>
        </dl>

      </main>
      {/* <footer className="foot">{name}. {user.email}</footer> */}

      <footer className="sf">
        <div className="sf-in">
          <div className="sf-top">
            <a href="#top" className="sf-logo">{p.first_name} <span>{p.last_name}</span></a>

            <div className="sf-nav">
              <div className="sf-col">
                <ul>
                  <li><a href="#top">About</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#skills">Skills</a></li>
                </ul>
                <ul className="sf-soft">
                  <li>Email</li>
                  <li><a href={`mailto:${user.email}`}>{user.email}</a></li>
                </ul>
              </div>
              <div className="sf-col">
                <ul>
                  <li><a href="#background">Education</a></li>
                  <li><a href="#background">Achievements</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <ul className="sf-social">
                {own(d.social_links).map(l => (
                  <li key={l.social_link_id}>
                    <a href={l.url} target="_blank" rel="noreferrer" aria-label={l.platform}>
                      <Icon name={l.platform.toLowerCase()} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sf-bottom">
            <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
            <span>Built with React + Vite</span>
            <a href="#top">(Back to top)</a>
          </div>
        </div>
      </footer>



    </>
  )
}
