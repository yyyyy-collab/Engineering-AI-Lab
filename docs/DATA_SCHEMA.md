# DATA_SCHEMA
content.json 包含 schemaVersion 與 items。每筆 item 必須有 id、title、category、type、summary、tags、date、readTime、sourceNote、content。id 唯一且 kebab-case；category 必須存在於 categories.json；type 限 knowledge/project/log；date 格式 YYYY-MM-DD；content 至少三段，每段含 heading、body。每筆 JSON 必須有對應 notes/<category>/<id>.md。body 僅使用純文字與換行。
