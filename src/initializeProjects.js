// Script to initialize Firebase with projects from old portfolio
// This is a CommonJS version that works with Node.js directly

const projects = [
    {
        title: 'SalesData Dashboard',
        description: 'Developed a dashboard to track $728K in electronics sales, leveraging automation and data visualization to provide actionable insights for an Upwork client.',
        tags: ['Data Viz', 'Automation', 'Python', 'Airtable', 'Zapier'],
        image: '',
        demoUrl: '',
        githubUrl: 'https://github.com/Syllaboi/Segun-Salako-Projects-Documentation/tree/Sales-data-Dashboard',
        featured: true,
        createdAt: new Date('2024-01-15').toISOString()
    },
    {
        title: 'Content Creation Workflow',
        description: 'Developed a smart Airtable content calendar to streamline content management, reducing creation time by 60% and increasing on-time publishing by 85%.',
        tags: ['Airtable', 'Zapier', 'Automation', 'Content Strategy'],
        image: '',
        demoUrl: '',
        githubUrl: 'https://github.com/Syllaboi/Data-Analysis-Project-Documentation/tree/Social-Media-Content-Automation',
        featured: true,
        createdAt: new Date('2024-02-20').toISOString()
    },
    {
        title: 'AI Education Platform Infrastructure',
        description: 'Designed an AI education platform infrastructure using Notion and Google Suite to streamline enrollment, content, and outreach. Reduced admin tasks by 50% and achieved 90% student satisfaction.',
        tags: ['Notion', 'Google Suite', 'Automation', 'EdTech'],
        image: '',
        demoUrl: '',
        githubUrl: 'https://github.com/Syllaboi/Segun-Salako-Projects-Documentation/tree/Ai-Education-Platform-Automation-Template',
        featured: true,
        createdAt: new Date('2024-03-10').toISOString()
    },
    {
        title: 'Remote Job Alert System',
        description: 'Built an automated remote job alert system using Google Apps Script that fetches job postings from Remotive API, filters by keywords, and sends Telegram notifications while logging data in Google Sheets.',
        tags: ['Google Apps Script', 'JavaScript', 'Automation', 'API Integration', 'Telegram Bot'],
        image: '',
        demoUrl: '',
        githubUrl: 'https://github.com/Syllaboi/Segun-Salako-Projects-Documentation/tree/Job-Alert-with-Scripting',
        featured: true,
        createdAt: new Date('2024-04-05').toISOString()
    },
    {
        title: 'Self-Hosted n8n Automation Server',
        description: 'Self-hosted n8n on Google Cloud VM using Docker, PostgreSQL, and Caddy for remote access. Configured cloud PostgreSQL to securely store credentials and workflows with custom hostname for seamless remote automation management.',
        tags: ['n8n', 'Docker', 'PostgreSQL', 'Caddy', 'Google Cloud', 'Self-Hosting'],
        image: '',
        demoUrl: '',
        githubUrl: 'https://github.com/Syllaboi/Segun-Salako-Automation-Projects/tree/%F0%9F%9A%80-Self-Hosted-n8n-Automation-Server-(Docker-%2B-PostgreSQL-%2B-Caddy)',
        featured: true,
        createdAt: new Date('2024-05-12').toISOString()
    },
    {
        title: 'Agent Smith - Personal/Business Assistant',
        description: 'Built an AI-powered personal and business assistant with multiple specialized agents using Lovable.dev for the frontend chatbot interface and n8n for backend automation via webhooks. Features include content creation, calendar management, appointments, contact research, and CEO lead scraping.',
        tags: ['AI Agent', 'Lovable.dev', 'n8n', 'Webhook', 'Automation', 'Chatbot'],
        image: '',
        demoUrl: '',
        githubUrl: 'https://github.com/Syllaboi/Segun-Salako-Automation-Projects/tree/Agent-Smith--Prsonal/Business-Assitant',
        featured: true,
        createdAt: new Date('2024-06-18').toISOString()
    }
];

console.log('📋 Projects data prepared!');
console.log(`Total projects: ${projects.length}`);
console.log('\n✅ To add these projects to your portfolio:');
console.log('1. Open your portfolio in the browser (http://localhost:5173)');
console.log('2. Go to the Admin Panel (/admin)');
console.log('3. Login with your password');
console.log('4. Click "Add New Project" for each project');
console.log('5. Copy the data from this file and paste into the form');
console.log('\nOR');
console.log('The projects will be automatically added when you first load the app!');
console.log('They are already in the default content in ContentContext.jsx');

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projects;
}
