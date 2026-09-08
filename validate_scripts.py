import re

with open('templates/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
print(f'Total script tags: {len(scripts)}')

main_script = scripts[0]
lines = main_script.split('\n')

with open('main_script.js', 'w', encoding='utf-8') as f:
    f.write(main_script)

print('--- Lines 2800 to 2825 in main_script.js ---')
for i in range(2795, min(len(lines), 2825)):
    print(f'{i+1}: {lines[i]}')

print('--- Lines 2970 to 3005 in main_script.js ---')
for i in range(2970, min(len(lines), 3005)):
    print(f'{i+1}: {lines[i]}')
