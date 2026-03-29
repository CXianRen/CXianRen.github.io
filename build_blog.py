import os
import json
import re

POST_DIR = 'post'
INDEX_FILE = os.path.join(POST_DIR, 'index.json')

def build_index():
    if not os.path.exists(POST_DIR):
        os.makedirs(POST_DIR)
        
    posts = []
    
    for filename in os.listdir(POST_DIR):
        if filename.endswith('.md'):
            filepath = os.path.join(POST_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            title = filename.replace('.md', '')
            date = ""
            category = "Uncategorized"
            
            meta_match = re.match(r'^\s*<!--(.*?)-->', content, re.DOTALL)
            if meta_match:
                meta_text = meta_match.group(1)
                for line in meta_text.split('\n'):
                    if ':' in line:
                        k, v = line.split(':', 1)
                        k = k.strip().lower()
                        v = v.strip()
                        if k == 'title': title = v
                        elif k == 'date': date = v
                        elif k == 'category': 
                            # Convert multiple categories/tags to a list using commas
                            category = [c.strip() for c in v.split(',') if c.strip()]
                        
            # Ensure category is a list for consistency
            if isinstance(category, str):
                category = [category]
                
            posts.append({
                'filename': filename,
                'title': title,
                'date': date,
                'category': category
            })
            
    posts.sort(key=lambda x: x['date'], reverse=True)
    
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
        
    print(f"Index built successfully with {len(posts)} posts!")

if __name__ == '__main__':
    build_index()
