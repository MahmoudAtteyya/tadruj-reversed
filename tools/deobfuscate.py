#!/usr/bin/env python3
"""
Deobfuscate and beautify JavaScript bundle
Usage: python3 deobfuscate.py <input.js> [output.js]
"""

import re
import sys
import json
from pathlib import Path


def beautify_js(js_content):
    """Basic JavaScript beautification"""
    
    # Add newlines after semicolons (but not in strings)
    lines = []
    in_string = False
    current_line = []
    string_char = None
    
    i = 0
    while i < len(js_content):
        char = js_content[i]
        
        # Handle string literals
        if char in '"\'`' and (i == 0 or js_content[i-1] != '\\'):
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
        
        # Add appropriate spacing
        if not in_string:
            if char == '{':
                current_line.append(char)
                lines.append(''.join(current_line))
                current_line = ['  ']
            elif char == '}':
                lines.append(''.join(current_line))
                current_line = [char]
            elif char == ';':
                current_line.append(char)
                lines.append(''.join(current_line))
                current_line = []
            else:
                current_line.append(char)
        else:
            current_line.append(char)
        
        i += 1
    
    if current_line:
        lines.append(''.join(current_line))
    
    return '\n'.join(lines)


def extract_strings(js_content):
    """Extract all strings from JavaScript"""
    
    # Extract single-quoted strings
    single_quoted = re.findall(r"'([^'\\]*(?:\\.[^'\\]*)*)'", js_content)
    
    # Extract double-quoted strings
    double_quoted = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', js_content)
    
    # Extract template literals
    template = re.findall(r'`([^`\\]*(?:\\.[^`\\]*)*)`', js_content)
    
    # Combine and filter
    all_strings = single_quoted + double_quoted + template
    
    # Filter out short strings
    meaningful_strings = [s for s in all_strings if len(s) > 3]
    
    return meaningful_strings


def extract_arabic_strings(strings):
    """Extract Arabic strings"""
    
    # Arabic Unicode range: U+0600 to U+06FF
    arabic_pattern = re.compile(r'[\u0600-\u06FF]+')
    
    arabic_strings = []
    for s in strings:
        if arabic_pattern.search(s):
            arabic_strings.append(s)
    
    return arabic_strings


def extract_urls(js_content):
    """Extract URLs from JavaScript"""
    
    urls = re.findall(r'https?://[^\s"\'<>]+', js_content)
    return list(set(urls))


def extract_functions(js_content):
    """Extract function definitions"""
    
    # Match function declarations
    functions = re.findall(r'function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(', js_content)
    
    # Count occurrences
    func_counts = {}
    for func in functions:
        func_counts[func] = func_counts.get(func, 0) + 1
    
    return func_counts


def analyze_bundle(js_content):
    """Analyze JavaScript bundle"""
    
    analysis = {
        'size_bytes': len(js_content),
        'lines': js_content.count('\n'),
        'functions': extract_functions(js_content),
        'urls': extract_urls(js_content),
        'strings': {
            'total': len(extract_strings(js_content)),
            'arabic': len(extract_arabic_strings(extract_strings(js_content)))
        }
    }
    
    return analysis


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 deobfuscate.py <input.js> [output.js]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'beautified.js'
    
    # Read input
    print(f"📖 Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Analyze
    print(f"\n🔍 Analyzing bundle...")
    analysis = analyze_bundle(js_content)
    
    print(f"\n📊 Bundle Analysis:")
    print(f"  - Size: {analysis['size_bytes']:,} bytes")
    print(f"  - Lines: {analysis['lines']:,}")
    print(f"  - Functions: {len(analysis['functions'])}")
    print(f"  - URLs: {len(analysis['urls'])}")
    print(f"  - Arabic Strings: {analysis['strings']['arabic']}")
    
    # Beautify
    print(f"\n✨ Beautifying...")
    beautified = beautify_js(js_content)
    
    # Write output
    print(f"\n💾 Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(beautified)
    
    print(f"\n✅ Done!")
    print(f"   Input:  {input_file} ({len(js_content):,} bytes)")
    print(f"   Output: {output_file} ({len(beautified):,} bytes)")
    
    # Print top functions
    print(f"\n⚡ Top 10 Functions:")
    sorted_funcs = sorted(analysis['functions'].items(), 
                          key=lambda x: x[1], reverse=True)
    for func, count in sorted_funcs[:10]:
        print(f"   {func}: {count}x")
    
    # Print URLs
    if analysis['urls']:
        print(f"\n🌐 URLs Found:")
        for url in analysis['urls'][:10]:
            print(f"   {url}")


if __name__ == '__main__':
    main()
