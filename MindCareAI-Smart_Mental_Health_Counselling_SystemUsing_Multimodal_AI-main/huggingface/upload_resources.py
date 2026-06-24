"""Upload MindCareAI resource archives to a Hugging Face dataset repo.

Usage:
  python huggingface/upload_resources.py --repo-id alikabir/mindcareai-resources

Set HF_TOKEN in the environment first. The archives stay out of GitHub and are
stored on Hugging Face, where large ML artifacts belong.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from huggingface_hub import HfApi, create_repo


DEFAULT_FILES = [
    Path(r"C:\Users\alika\Downloads\MindCareAI_Resources.zip"),
    Path(r"C:\Users\alika\Downloads\MindCareAIextended.zip"),
]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-id", required=True, help="Hugging Face repo id, e.g. alikabir/mindcareai-resources")
    parser.add_argument("--repo-type", default="dataset", choices=["dataset", "model", "space"])
    parser.add_argument("--private", action="store_true", help="Create or keep the repo private")
    parser.add_argument("--files", nargs="*", type=Path, default=DEFAULT_FILES)
    args = parser.parse_args()

    if not os.environ.get("HF_TOKEN"):
        raise SystemExit("HF_TOKEN is not set. Create a write token at https://huggingface.co/settings/tokens.")

    missing = [str(path) for path in args.files if not path.exists()]
    if missing:
        raise SystemExit("Missing resource archive(s):\n" + "\n".join(missing))

    create_repo(args.repo_id, repo_type=args.repo_type, private=args.private, exist_ok=True)
    api = HfApi()

    for path in args.files:
        print(f"Uploading {path.name} ({path.stat().st_size:,} bytes)...")
        api.upload_file(
            path_or_fileobj=str(path),
            path_in_repo=f"archives/{path.name}",
            repo_id=args.repo_id,
            repo_type=args.repo_type,
            commit_message=f"Upload {path.name}",
        )

    print(f"Done: https://huggingface.co/datasets/{args.repo_id}")


if __name__ == "__main__":
    main()
