with open('src/routes/delimitation/+page.svelte', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'div class="scroll-section"' in line or 'div class="story"' in line:
        if i > 1600:
            print(f'Scroll section/story starts at line {i+1}')
            break
    if 'max-width: 900px; margin: 80px auto; padding: 0 20px; text-align: left;' in line:
        if i > 1600:
            print(f'Next section starts at line {i+1}')
            break
