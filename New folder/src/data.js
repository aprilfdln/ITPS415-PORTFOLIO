export default {
  meta: { title: 'UI and UX Designer' },

  users: [{ user_id: 1, email: 'Aprilannefedelino2021@gmail.com', role: 'owner', created_at: '2026-10-06T08:00:00+08:00' }],

  // middle_name: 'B.'
  
  profile: [{
    profile_id: 1, user_id: 1, first_name: 'Anne', last_name: 'Fedelino', is_public: true,
    bio: "Good design isn't just what you see. It's what you feel when everything simply works. I'm a UI/UX designer passionate about turning complex problems into clean, meaningful experiences."
  }],

  project: [
    { project_id: 1, profile_id: 1, title: 'Portfolio', is_featured: true, demo_url: null,
      description: 'The site you are viewing. A React and Vite portfolio whose content follows a 12-table database design.' },
    { project_id: 2, profile_id: 1, title: 'Book Library', is_featured: true, demo_url: 'https://quiz2-book-library-nine.vercel.app',
      description: 'A React app for browsing a book collection, built for a class quiz and deployed on Vercel.' },
    { project_id: 3, profile_id: 1, title: 'Enrollment Form', is_featured: false, demo_url: 'https://github.com/aprilfdln/enrollment_form',
      description: 'A student enrollment form built with HTML and CSS, focused on clear fields and easy filling.' },
    { project_id: 4, profile_id: 1, title: 'Spinner Activity', is_featured: false, demo_url: 'https://github.com/aprilfdln/HO_Act2-spinner',
      description: 'A hands-on JavaScript activity that practices interactive page behavior.' },
    { project_id: 5, profile_id: 1, title: 'Data Analytics', is_featured: false, demo_url: 'https://github.com/aprilfdln/Data-Analytics',
      description: 'Coursework exploring how to read and summarize data.' }
  ],

  project_media: [],

  skills: [
    { skill_id: 1, profile_id: 1, category: 'React', year_acquired: 2023, certification_taken: false },
    { skill_id: 2, profile_id: 1, category: 'Python', year_acquired: 2023, certification_taken: false },
    { skill_id: 3, profile_id: 1, category: 'HTML & CSS', year_acquired: 2023, certification_taken: false },
    { skill_id: 4, profile_id: 1, category: 'Django', year_acquired: 2026, certification_taken: false }
  ],

  project_skills: [
    { project_skill_id: 1, project_id: 1, skill_id: 1 }, { project_skill_id: 2, project_id: 1, skill_id: 3 },
    { project_skill_id: 3, project_id: 2, skill_id: 1 }, { project_skill_id: 4, project_id: 2, skill_id: 3 },
    { project_skill_id: 5, project_id: 3, skill_id: 3 },
    { project_skill_id: 6, project_id: 4, skill_id: 3 },
    { project_skill_id: 7, project_id: 5, skill_id: 2 }
  ],

  education: [{ education_id: 1, profile_id: 1, school_name: 'Dalubhasaan ng Lungsod ng Lucena', degree: 'Bachelor of Science',
    field_of_study: 'Information Technology', start_year: 2023, end_year: null, description: 'Currently studying.' }],

  activities: [
    { activity_id: 1, profile_id: 1, activity_name: 'Learning Django', organization: 'Self-study', role: 'Learner',
      start_date: '2026-01-01', end_date: null, is_ongoing: true, description: 'Building web back ends with Python to pair with my front-end work.' },
    { activity_id: 2, profile_id: 1, activity_name: 'Class projects on GitHub', organization: 'Dalubhasaan ng Lungsod ng Lucena', role: 'Student developer',
      start_date: '2023-08-01', end_date: null, is_ongoing: true, description: 'Turning class activities and quizzes into small web projects.' }
  ],

  achievements: [
    { achievement_id: 1, profile_id: 1, achievement_name: 'Deployed my first React app', issuer: 'Vercel', date_received: null, proof_url: 'https://quiz2-book-library-nine.vercel.app' },
    { achievement_id: 2, profile_id: 1, achievement_name: '11 public projects on GitHub', issuer: 'GitHub', date_received: null, proof_url: 'https://github.com/aprilfdln?tab=repositories' },
    { achievement_id: 3, profile_id: 1, achievement_name: 'Started BS Information Technology', issuer: 'Dalubhasaan ng Lungsod ng Lucena', date_received: '2023-08-01', proof_url: null }
  ],

  social_links: [
    { social_link_id: 1, profile_id: 1, platform: 'Facebook', username: 'aprilfdln', url: 'https://www.facebook.com/aprilfdln' },
    { social_link_id: 2, profile_id: 1, platform: 'Instagram', username: 'oyamesss', url: 'https://www.instagram.com/oyamesss/' },
    { social_link_id: 3, profile_id: 1, platform: 'GitHub', username: 'aprilfdln', url: 'https://github.com/aprilfdln' }
  ],

  analytic: [{ analytic_id: 1, profile_id: 1, viewers_count: 0, visited_time: '2026-10-06T08:00:00+08:00' }],

  contact_messages: []
}
