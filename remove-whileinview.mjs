// remove-whileinview-v2.mjs — Stack-based, nesting-aware motion removal
import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/pages/About.tsx',
  'src/pages/Education.tsx', 
  'src/pages/Admission.tsx',
  'src/pages/Contact.tsx',
  'src/pages/News.tsx',
];

for (const file of files) {
  let code = readFileSync(file, 'utf8');
  const lines = code.split('\n');
  const result = [];
  
  // Stack: true = keep (animate), false = remove (whileInView)
  const motionStack = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect opening motion tag
    if (trimmed.startsWith('<motion.')) {
      // Collect the full tag
      let tagLines = [line];
      let fullTag = line;
      let tagEndIdx = i;
      
      while (!fullTag.includes('>') && tagEndIdx < lines.length - 1) {
        tagEndIdx++;
        tagLines.push(lines[tagEndIdx]);
        fullTag += '\n' + lines[tagEndIdx];
      }
      
      const isSelfClosing = fullTag.trimEnd().endsWith('/>');
      const hasWhileInView = fullTag.includes('whileInView');
      const hasAnimate = fullTag.includes('animate=');
      
      if (hasWhileInView && !hasAnimate) {
        // REMOVE this motion wrapper — replace with plain tag
        const tagMatch = fullTag.match(/<motion\.(div|article|section)/);
        const tag = tagMatch ? tagMatch[1] : 'div';
        
        if (isSelfClosing) {
          // Progress bar: extract key attrs
          const indent = line.match(/^(\s*)/)[1];
          const clsMatch = fullTag.match(/className="([^"]+)"/);
          const styleMatch = fullTag.match(/style=\{\{([^}]+)\}\}/);
          const widthMatch = fullTag.match(/whileInView=\{\{\s*width:\s*`([^`]+)`/);
          
          let rep = `${indent}<div`;
          if (clsMatch) rep += ` className="${clsMatch[1]}"`;
          if (widthMatch) {
            if (styleMatch) rep += ` style={{ width: \`${widthMatch[1]}\`, ${styleMatch[1]} }}`;
            else rep += ` style={{ width: \`${widthMatch[1]}\` }}`;
          } else if (styleMatch) {
            rep += ` style={{ ${styleMatch[1]} }}`;
          }
          rep += ' />';
          result.push(rep);
        } else {
          // Regular opening: extract key + className
          const indent = line.match(/^(\s*)/)[1];
          const keyMatch = fullTag.match(/key=\{([^}]+)\}/);
          const clsMatch = fullTag.match(/className="([^"]+)"/);
          
          let rep = `${indent}<${tag}`;
          if (keyMatch) rep += ` key={${keyMatch[1]}}`;
          if (clsMatch) rep += ` className="${clsMatch[1]}"`;
          rep += '>';
          result.push(rep);
          
          // Push to stack: false = this was a whileInView, close tag should be </div>
          motionStack.push(false);
        }
        
        i = tagEndIdx + 1;
        continue;
      } else {
        // KEEP this motion tag (it's an animate= tag, not whileInView)
        for (const tl of tagLines) result.push(tl);
        if (!isSelfClosing) motionStack.push(true); // true = keep as motion
        i = tagEndIdx + 1;
        continue;
      }
    }
    
    // Detect closing motion tag
    const closeMatch = trimmed.match(/^<\/motion\.(div|article|section)>$/);
    if (closeMatch) {
      if (motionStack.length > 0) {
        const keep = motionStack.pop();
        if (keep) {
          // Keep as </motion.xxx>
          result.push(line);
        } else {
          // Replace with plain </xxx>
          result.push(line.replace(`</motion.${closeMatch[1]}>`, `</${closeMatch[1]}>`));
        }
      } else {
        // No matching open — just replace to be safe
        result.push(line.replace(`</motion.${closeMatch[1]}>`, `</${closeMatch[1]}>`));
      }
      i++;
      continue;
    }
    
    result.push(line);
    i++;
  }
  
  const output = result.join('\n');
  writeFileSync(file, output, 'utf8');
  
  const remaining = (output.match(/whileInView/g) || []).length;
  const motionCount = (output.match(/<motion\./g) || []).length;
  const closeCount = (output.match(/<\/motion\./g) || []).length;
  console.log(`${file}: whileInView=${remaining} opens=${motionCount} closes=${closeCount}`);
}

console.log('All done!');
