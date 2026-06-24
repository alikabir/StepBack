# MindCareAI Hugging Face Resources

The source code is small enough for GitHub. The AI resources are not:

- `MindCareAI_Resources.zip` is about 3.1 GB compressed and contains the pretrained behaviour, face, and voice models plus training assets.
- `MindCareAIextended.zip` is about 15 MB and contains an extended source/assets snapshot.

Upload these archives to a Hugging Face dataset repo, for example:

```powershell
pip install -U huggingface_hub
$env:HF_TOKEN = "hf_your_write_token"
python huggingface/upload_resources.py --repo-id alikabir/mindcareai-resources
```

Recommended dataset URL:

```text
https://huggingface.co/datasets/alikabir/mindcareai-resources
```

For backend inference, extract the pretrained model files into:

```text
backend/Pre-trained_Models/
```

Those model files are intentionally ignored by Git. If the backend is deployed as a Hugging Face Space, either commit the required model files to the Space repository with Git LFS or download them from the dataset repo during the Space build/startup.
