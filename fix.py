import re

with open('src/routes/delimitation/+page.svelte', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken div tag
content = content.replace(
    'in the delimitation process and the stakeholders involved at\n                style="display: flex; gap: 150px; align-items: flex-start; position: relative; margin-top: 40px;"\n            >',
    'in the delimitation process and the stakeholders involved at\n                each stage.\n            </p>\n\n            <div\n                style="display: flex; gap: 150px; align-items: flex-start; position: relative; margin-top: 40px;"\n            >'
)

# Find the start of the duplicated SVG
dup_start_pattern = r'\n                        viewBox="0 0 700 400"\n                        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow: visible;"\n                    >\n                        <defs>'
dup_end_pattern = r'PUBLICATION OF<br />DELIMITATION ORDER\n                    </div>\n                </div>\n'

start_idx = content.find('                        viewBox="0 0 700 400"\n                        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow: visible;"\n                    >\n                        <defs>')
if start_idx != -1:
    print("Found start of duplicate block")
    
    # We want to find the NEXT occurrence of the end of the text boxes after this point
    end_text = 'PUBLICATION OF<br />DELIMITATION ORDER\n                    </div>\n                </div>'
    end_idx = content.find(end_text, start_idx)
    
    if end_idx != -1:
        end_idx += len(end_text)
        print("Found end of duplicate block. Removing...")
        
        # Remove the duplicate block
        new_content = content[:start_idx] + content[end_idx:]
        
        with open('src/routes/delimitation/+page.svelte', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("File fixed successfully!")
    else:
        print("Could not find end of duplicate block")
else:
    print("Could not find start of duplicate block")
