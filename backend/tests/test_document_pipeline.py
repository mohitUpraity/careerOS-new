import asyncio
import io
from httpx import AsyncClient, ASGITransport
from backend.app.main import app
from backend.app.core.database import init_db

async def run_pipeline_tests():
    await init_db()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        print("\n--- 1. Testing Resume Upload & Golden Base Activation ---")
        resume_content = b"""
        Mohit Upraity
        AI Systems & Infrastructure Engineer
        Email: mohit@example.com
        Location: Remote / Bengaluru
        GitHub: https://github.com/mohitupraity
        LinkedIn: https://linkedin.com/in/mohitupraity

        EXPERIENCE
        Senior AI Infrastructure Engineer - DeepMind Systems (2022 - Present)
        - Engineered low-latency inference pipelines with vLLM and TensorRT reducing latency by 45%.
        - Designed custom Triton attention kernels for high-throughput batching across 64 GPUs.

        EDUCATION
        B.Tech in Computer Science & Engineering
        Indian Institute of Technology (2018 - 2022)

        PROJECTS
        CareerOS Agentic Engine | Python, FastAPI, PyTorch, NetworkX
        - Autonomous career telemetry and knowledge graph orchestration platform.

        SKILLS
        PyTorch, CUDA, Triton, vLLM, TensorRT, FastAPI, Docker, Kubernetes, Python, PostgreSQL
        """
        
        files = {"file": ("master_resume.txt", io.BytesIO(resume_content), "text/plain")}
        data = {"doc_type": "resume", "set_as_golden": "true"}
        res = await client.post("/api/v1/documents/upload", files=files, data=data)
        print("Resume Upload Status:", res.status_code)
        res_data = res.json()
        print("Resume Upload Data:", res_data["status"], res_data["message"])
        assert res.status_code == 200
        assert res_data["status"] == "success"
        assert res_data["is_golden_template"] is True
        assert res_data["skills_extracted_count"] >= 5
        resume_doc_id = res_data["document_id"]

        print("\n--- 2. Testing Certificate Upload & Verification Proof Extraction ---")
        cert_content = b"""
        Certificate of Completion
        This certifies that Mohit Upraity has successfully achieved:
        AWS Certified Solutions Architect - Associate
        Issuing Organization: Amazon Web Services (AWS)
        Credential ID: AWS-SA-982410294
        Issue Date: May 2024
        Skills Verified: AWS, Docker, Kubernetes, Linux, Terraform, Prometheus
        Verification Link: https://aws.amazon.com/verify/credential/AWS-SA-982410294
        """
        files = {"file": ("aws_solutions_architect.txt", io.BytesIO(cert_content), "text/plain")}
        data = {"doc_type": "certificate"}
        cert_res = await client.post("/api/v1/documents/upload", files=files, data=data)
        print("Certificate Upload Status:", cert_res.status_code)
        cert_data = cert_res.json()
        print("Certificate Extracted Summary:", cert_data["extracted_summary"])
        assert cert_res.status_code == 200
        assert cert_data["status"] == "success"
        assert cert_data["evidence_extracted_count"] >= 1

        print("\n--- 3. Testing Internship Letter Upload & Telemetry Extraction ---")
        intern_content = b"""
        CERTIFICATE OF INTERNSHIP
        Anthropic Research Labs
        This is to certify that Mohit Upraity worked as an AI Research Intern from Jan 2022 to Jun 2022.
        Responsibilities and Achievements:
        - Built distributed training pipelines using DeepSpeed and PyTorch.
        - Optimized KV cache memory footprint reducing GPU VRAM allocation by 30%.
        - Developed automated benchmarking harnesses processing 100k requests daily.
        """
        files = {"file": ("anthropic_internship_letter.txt", io.BytesIO(intern_content), "text/plain")}
        data = {"doc_type": "internship"}
        intern_res = await client.post("/api/v1/documents/upload", files=files, data=data)
        print("Internship Upload Status:", intern_res.status_code)
        intern_data = intern_res.json()
        print("Internship Extracted Summary:", intern_data["extracted_summary"])
        assert intern_res.status_code == 200
        assert intern_data["status"] == "success"

        print("\n--- 4. Testing Course Completion Upload ---")
        course_content = b"""
        Deep Learning Specialization
        DeepLearning.AI on Coursera
        Instructor: Andrew Ng
        Grade Achieved: 99.4% with Honors
        Date: March 2023
        Covered: PyTorch, Neural Networks, Transformer Architectures, JAX
        """
        files = {"file": ("coursera_deep_learning.txt", io.BytesIO(course_content), "text/plain")}
        data = {"doc_type": "course"}
        course_res = await client.post("/api/v1/documents/upload", files=files, data=data)
        print("Course Upload Status:", course_res.status_code)
        assert course_res.status_code == 200

        print("\n--- 5. Testing List Documents & Golden Resume Status ---")
        docs_res = await client.get("/api/v1/documents")
        print("List Documents Status:", docs_res.status_code)
        docs_list = docs_res.json()
        print(f"Total Uploaded Documents: {docs_list['total_count']}, Golden Resume ID: {docs_list['golden_resume_id']}")
        assert docs_res.status_code == 200
        assert docs_list["total_count"] >= 4
        assert docs_list["golden_resume_id"] == resume_doc_id

        print("\n--- 6. Testing Personal Knowledge Graph Construction ---")
        kg_res = await client.get("/api/v1/knowledge-graph")
        print("Knowledge Graph Status:", kg_res.status_code)
        kg_data = kg_res.json()
        nodes = kg_data["nodes"]
        edges = kg_data["edges"]
        metrics = kg_data["metrics"]
        print(f"Knowledge Graph Metrics: Nodes={metrics['nodes_count']}, Edges={metrics['edges_count']}, Skills={metrics['skills_count']}, Evidence={metrics['evidence_count']}")
        assert kg_res.status_code == 200
        assert metrics["nodes_count"] > 10
        assert metrics["edges_count"] > 10

        # Verify Golden Resume and Document nodes exist
        golden_nodes = [n for n in nodes if n["category"] == "Golden Baseline"]
        assert len(golden_nodes) >= 1
        print("Golden Baseline Node found:", golden_nodes[0]["label"])

        # Verify Certificate nodes exist
        cert_nodes = [n for n in nodes if n["type"] == "certificate"]
        print(f"Certificate Nodes in Graph ({len(cert_nodes)}):", [c["label"] for c in cert_nodes])

        print("\n--- 7. Testing Golden Base Resume Synchronization ---")
        golden_res = await client.get("/api/v1/resume/golden")
        print("Golden Resume Status:", golden_res.status_code)
        golden_json = golden_res.json()
        print("Master Golden Resume Title:", golden_json["title"])
        assert golden_res.status_code == 200
        assert "content_json" in golden_json

        print("\n🎉 ALL MULTI-DOCUMENT KNOWLEDGE EXTRACTION & CONNECTION SYNCING PIPELINE TESTS PASSED! 🚀")

if __name__ == "__main__":
    asyncio.run(run_pipeline_tests())
