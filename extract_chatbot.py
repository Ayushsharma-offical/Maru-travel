import json
import os

log_dir = r"C:\Users\HP\.gemini\antigravity\brain\d805daa5-39e6-496c-b957-8db30e09d17b\.system_generated\logs"
transcript_path = os.path.join(log_dir, "transcript_full.jsonl")

chatbot_code = ""

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "USER_INPUT":
                content = data.get("content", "")
                if "MARU TRAVEL — CONCIERGE CHATBOT WIDGET" in content:
                    # Extract code from the <USER_REQUEST> tag if it's there
                    start_marker = "<USER_REQUEST>\n"
                    end_marker = "\n</USER_REQUEST>"
                    if start_marker in content and end_marker in content:
                        start_idx = content.find(start_marker) + len(start_marker)
                        end_idx = content.find(end_marker, start_idx)
                        code = content[start_idx:end_idx].strip()
                        if code.startswith("/**"):
                            chatbot_code = code
        except Exception as e:
            pass

if chatbot_code:
    output_path = r"C:\Users\HP\OneDrive\Desktop\MARU TRAVEL INDIA\maru_travel_clone\chatbot.js"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(chatbot_code)
    print(f"Successfully extracted chatbot code ({len(chatbot_code)} bytes) and saved to {output_path}")
else:
    print("Could not find the chatbot code in the transcript.")
