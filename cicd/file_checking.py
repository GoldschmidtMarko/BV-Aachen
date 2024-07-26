import os
import sys
import subprocess
from html.parser import HTMLParser

class HTMLSyntaxChecker(HTMLParser):
    def __init__(self, file_path, content):
        super().__init__()
        self.file_path = file_path
        self.lines = content.splitlines()
        self.tag_stack = []
        self.errors = []
        self.current_line = 1

    def handle_starttag(self, tag, attrs):
        if tag not in SELF_CLOSING_TAGS:
            self.tag_stack.append((tag, self.current_line))

    def handle_startendtag(self, tag, attrs):
        # This handles tags like <img ... />, <br />, etc.
        pass

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1][0] == tag:
            self.tag_stack.pop()
        else:
            self.errors.append((tag, self.current_line, 'unexpected closing', self.lines[self.current_line-1]))

    def handle_data(self, data):
        self.current_line += data.count('\n')

    def handle_comment(self, data):
        self.current_line += data.count('\n')

    def handle_decl(self, decl):
        self.current_line += decl.count('\n')

    def check_unclosed_tags(self):
        for tag, line in self.tag_stack:
            self.errors.append((tag, line, 'unclosed opening', self.lines[line-1]))

    def print_errors(self):
        for tag, line, error, line_content in self.errors:
            print()
            print(f"Error: {error} tag <{tag}> found at line {line} in file '{self.file_path}'")
            print(f"Line content: {line_content}")
            print()

SELF_CLOSING_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
}

def check_html_syntax(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    checker = HTMLSyntaxChecker(file_path, content)
    checker.feed(content)
    checker.check_unclosed_tags()
    number_errors = len(checker.errors)
    if number_errors == 0:
        print(f"No errors found in file '{file_path}'")
    else:
        print(f"{number_errors} error(s) found in file '{file_path}':")
        print()
        checker.print_errors()
    return number_errors

def check_documents(doc_paths):
    total_errors = 0
    for doc_path in doc_paths:
        if os.path.exists(doc_path) and os.path.isfile(doc_path):
            print()
            print(f"Checking document: {doc_path}")
            total_errors += check_html_syntax(doc_path)
        else:
            print(f"File '{doc_path}' does not exist or is not a file.")
    print()
    print(f"Total number of errors found: {total_errors}")
    return total_errors
    

# Function to get all HTML files in the repository
def get_html_files(repo_root):
    html_files = []
    for root, _, files in os.walk(repo_root):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files



def run_check_html_syntax():
    # find all html files in the current directory
    repo_root_path = subprocess.check_output(['git', 'rev-parse', '--show-toplevel']).decode('utf-8').strip()
    html_files = get_html_files(repo_root_path)
    
    total_errors = check_documents(html_files)
    
    # Exit with a non-zero status if there are errors
    if total_errors > 0:
        sys.exit(1)
    else:
        sys.exit(0)
        

if __name__ == "__main__":
    run_check_html_syntax()
