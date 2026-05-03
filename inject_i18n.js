import { readFileSync, writeFileSync } from 'fs';

const fixTranslationFile = (filePath, isUz) => {
  let content = readFileSync(filePath, 'utf8');
  
  // 1. Add missing about arrays if not present (only for en and ru)
  if (!isUz) {
    if (!content.includes('food_chef:')) {
      const additionalAbout = `
    food_chef: "Food Chef",
    food_chef_name: "Azizbek Matnazarov",
    food_chef_desc: "-",
    transport_badge: "Transport System",
    transport_title: "Transport",
    transport_desc: "-",
    transport_features: [
      { label: "Track online via GPS." },
      { label: "Supervisor teacher aboard." },
    ],
    transport_stats: [
      { val: '4', label: "Buses" },
      { val: '100%', label: "GPS security" },
    ],
    yashnar_badge: "Yashnar",
    yashnar_title: "Yashnar Kindergarten",
    yashnar_desc: "Innovative kindergarten",
    yashnar_features: [
      "In-depth languages",
      "Mental arithmetic",
      "Gymnastics and chess",
      "Healthy food"
    ],
    inclusive_title: "Inclusive Education",
    inclusive_subtitle: "Corrective class for special needs.",
    ecosystem_title: "School Ecosystem",
    ecosystem_desc: "Holistic student development.",
    comms_title: "Parent Communication",
    comms_steps: [
      { num: '01', title: 'Tutor', desc: "Personal mentor" },
      { num: '02', title: 'Admin', desc: "First point of contact" },
      { num: '03', title: 'Assembly', desc: "Monthly meetings" },
      { num: '04', title: 'Durbin', desc: "Real-time grades" },
    ],
`;
      // Insert before `  },` and `  education: {`
      content = content.replace(
        /    \],\n  \},\n  education: \{/g,
        `    ],\n${additionalAbout}  },\n  education: {`
      );
    }
  }

  // 2. Add team object if missing
  if (!content.includes('team: {')) {
    const teamObj = `
  team: {
    hero_title: 'Bizning Jamoa',
    hero_desc: "DATA Xalqaro Maktabining eng katta kuchi — uning fidoyi va professional jamoasi.",
    management_title: "Menejment Jamoasi",
    teachers_title: "Ingliz Tili Ustozlari",
    teachers_desc: "Maktabimiz faxri.",
    selection_title: "Ustoz Tanlash Jarayoni",
    selection_subtitle: "Ustozlarimiz qanday tanlanadi?",
    selection_steps: [
      { label: "HR O'rganishi" },
      { label: "Sinov Muddati" },
      { label: "Suhbat" },
      { label: "Sinov Darsi" },
    ]
  },
`;
    content = content.replace(
      /  education: \{/g,
      `${teamObj}  education: {`
    );
  }

  writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', filePath);
};

fixTranslationFile('src/i18n/uz.ts', true);
fixTranslationFile('src/i18n/en.ts', false);
fixTranslationFile('src/i18n/ru.ts', false);
