import json, re, pathlib
def read(n): return pathlib.Path(n).read_text()
def test_files_exist():
    for f in ["tokens.css","components.css","components.js","index.html","tokens.json"]:
        assert pathlib.Path(f).exists()
def test_tokens():
    t = json.loads(read("tokens.json"))
    assert "primary" in t["colors"]
    assert "dark" in t["themes"]
    css = read("tokens.css")
    assert "--color-primary" in css
    assert '[data-theme="dark"]' in css
def test_all_10_components_in_storybook():
    html = read("index.html")
    for kw in ["btn-primary","demoForm","ddBtn","modal","showToast","tab","Data Table","type=\"date\"","tooltip","spinner"]:
        assert kw in html, kw
def test_a11y_attrs():
    html = read("index.html")
    for attr in ['role="dialog"','aria-modal','aria-invalid','role="tablist"','aria-sort','role="tooltip"','aria-busy','role="alert"']:
        assert attr in html, attr
def test_keyboard_handlers():
    js = read("components.js")
    assert "Escape" in js
    assert "keydown" in js
def test_validation_logic():
    js = read("components.js")
    assert "validateForm" in js
    assert "@" in js
def test_variants():
    css = read("components.css")
    for v in [".btn-primary",".btn-secondary",".btn-danger",".btn-ghost",".btn-outline",".btn-sm",".btn-lg",".input-error",".input-success"]:
        assert v in css, v
