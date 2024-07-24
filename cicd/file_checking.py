import os
from html.parser import HTMLParser

class HTMLSyntaxChecker(HTMLParser):
    def __init__(self, file_path):
        super().__init__()
        self.file_path = file_path
        self.tag_stack = []
        self.errors = []
        self.current_line = 1

    def handle_starttag(self, tag, attrs):
        if tag not in SELF_CLOSING_TAGS:
            self.tag_stack.append((tag, self.current_line))

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1][0] == tag:
            self.tag_stack.pop()
        else:
            self.errors.append((tag, self.current_line, 'unexpected closing'))

    def handle_data(self, data):
        self.current_line += data.count('\n')

    def check_unclosed_tags(self):
        for tag, line in self.tag_stack:
            self.errors.append((tag, line, 'unclosed opening'))

    def print_errors(self):
        for tag, line, error in self.errors:
            print(f"Error: {error} tag <{tag}> found at line {line} in file '{self.file_path}'")

SELF_CLOSING_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
}

def check_html_syntax(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    checker = HTMLSyntaxChecker(file_path)
    checker.feed(content)
    checker.check_unclosed_tags()
    checker.print_errors()

def check_documents(doc_paths):
    for doc_path in doc_paths:
        if os.path.exists(doc_path) and os.path.isfile(doc_path):
            print()
            print(f"Checking document: {doc_path}")
            check_html_syntax(doc_path)
        else:
            print(f"File '{doc_path}' does not exist or is not a file.")

# Example usage:
doc_paths = [
    'index.html',
    'kontakt.html',
    "alemannencup.html",
    "datenschutz.html",
    "FAQ.html",
    "impressum.html",
    "teams.html",
    "training.html",
    "verein.html",
    # Add more document paths here
]

check_documents(doc_paths)
