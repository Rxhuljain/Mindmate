import gradio as gr
from transformers import pipeline

chatbot = pipeline("text-generation", model="mental/mental-bert-base-uncased")

def chat(input, system_prompt, max_tokens, temp, top_p):
    # your logic to combine prompts and return a response
    result = chatbot(f"{system_prompt}\nUser: {input}\nAI:", max_length=max_tokens, temperature=temp, top_p=top_p)
    return result[0]["generated_text"]

interface = gr.Interface(fn=chat,
                         inputs=["text", "text", "slider", "slider", "slider"],
                         outputs="text")

demo = gr.Interface(fn=chatbot, inputs=..., outputs=...)
demo.launch()

interface.launch()
