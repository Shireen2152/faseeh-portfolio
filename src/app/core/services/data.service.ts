import { Injectable } from '@angular/core';
import {
  PersonalInfo, NavItem, Skill, Project, Certification,
  Experience, Education, ContactInfo, StatItem
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class DataService {

  readonly navItems: NavItem[] = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'About', sectionId: 'about' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  readonly personalInfo: PersonalInfo = {
    name: 'Mohamed Faseeh',
    roles: [
      'Cloud & DevOps Engineer',
      'Cloud Production Engineer',
      'Site Reliability Engineer',
    ],
    tagline: 'Fueling uptime, speed, and secure infrastructure. Building automated CI/CD pipelines for seamless delivery. Driven by reliability, monitoring, and cloud efficiency.',
    aboutPoints: [
      'Cloud and DevOps Engineer with 2+ Years of hands-on experience in managing and optimizing cloud environments, application deployments, and monitoring.',
      'Proficient in AWS services, Docker containerization and Elastic Stack for logging and monitoring.',
      'Skilled in resolving incidents, optimizing infrastructure, and ensuring high system reliability.',
      'Experienced in 24/7 on-call support and Linux System Administration.',
    ],
    resumePath: 'assets/resume/Mohamed Faseeh - Resume.pdf',
  };

  readonly stats: StatItem[] = [
    { value: 2, suffix: '+', label: 'Years Experience', icon: 'briefcase' },
    { value: 10, suffix: '+', label: 'Projects Completed', icon: 'code' },
    { value: 4, suffix: '', label: 'Certifications', icon: 'award' },
    { value: 99.9, suffix: '%', label: 'Uptime Achieved', icon: 'activity' },
  ];

  readonly skills: Skill[] = [
    { name: 'AWS', icon: 'assets/images/aws.svg', level: 90, category: 'Cloud', color: '#FF9900' },
    { name: 'Docker', icon: 'assets/images/docker.svg', level: 85, category: 'Containers', color: '#2396ED' },
    { name: 'Kubernetes', icon: 'assets/images/Kubernetes.svg', level: 75, category: 'Containers', color: '#316CE4' },
    { name: 'Prometheus', icon: 'assets/images/prometheus.svg', level: 80, category: 'Monitoring', color: '#E6522C' },
    { name: 'Grafana', icon: 'assets/images/grafana.svg', level: 80, category: 'Monitoring', color: '#EF8607' },
    { name: 'GitHub', icon: 'assets/images/github-white.svg', level: 90, category: 'CI/CD', color: '#ffffff' },
    { name: 'GitLab CI/CD', icon: 'assets/images/Gitlab.svg', level: 85, category: 'CI/CD', color: '#FC6D26' },
    { name: 'Linux', icon: 'assets/images/linux.svg', level: 85, category: 'OS', color: '#F8BF11' },
    { name: 'Terraform', icon: 'assets/images/Terraform.svg', level: 80, category: 'IaC', color: '#7B42BC' },
    { name: 'Elastic Stack', icon: 'assets/images/elasticstack.svg', level: 75, category: 'Monitoring', color: '#E8478B' },
    { name: 'Liquibase', icon: 'assets/images/liquibase.svg', level: 70, category: 'CI/CD', color: '#2A61FF' },
    { name: 'Splunk', icon: 'assets/images/splunk.svg', level: 70, category: 'Monitoring', color: '#65A637' },
  ];

  readonly projectCategories: string[] = ['All', 'DevSecOps', 'Cloud-Infra', 'Automation', 'Governance'];

  readonly projects: Project[] = [
    {
      id: 'netflix-eks',
      title: 'Netflix Clone Deployment on Amazon EKS',
      category: 'DevSecOps',
      description: 'Successfully deployed a production-ready Netflix Clone application using a complete DevSecOps workflow on Amazon EKS. The project focused on cloud-native deployment, CI/CD automation, security integration, and end-to-end monitoring.',
      link: 'https://github.com/mohamedfaseeh/DevSecOps-Project',
      techStack: ['AWS EKS', 'Terraform', 'Jenkins', 'Docker', 'Helm', 'Prometheus', 'Grafana', 'Trivy'],
      keyResponsibilities: [
        { title: 'Infrastructure & Deployment', items: [
          'Provisioned AWS cloud infrastructure using Terraform, including VPC, subnets, IAM roles, security groups, and Amazon EKS cluster.',
          'Deployed microservices using Kubernetes Helm charts for version-controlled, repeatable releases.',
          'Containerized application components using optimized Dockerfiles.',
        ]},
        { title: 'CI/CD Automation', items: [
          'Built a complete CI/CD pipeline in Jenkins, automating build, test, security scan, Docker image push, and deploy to EKS.',
          'Integrated Trivy for container vulnerability scanning.',
          'Automated Helm deployments to EKS as part of the pipeline.',
        ]},
        { title: 'Monitoring & Logging', items: [
          'Implemented Prometheus for cluster metrics and Alertmanager for alerting.',
          'Created custom Grafana dashboards for application, pod, and node-level monitoring.',
          'Configured centralized logging using the EFK Stack.',
        ]},
      ],
      technologies: [
        { title: 'Cloud & Infrastructure', items: ['AWS (EKS, EC2, VPC, IAM, CloudWatch), Terraform, eksctl, Helm'] },
        { title: 'DevOps & CI/CD', items: ['Jenkins, Docker, Git, Trivy, SonarQube'] },
        { title: 'Monitoring & Logging', items: ['Prometheus, Grafana, Alertmanager, EFK Stack'] },
      ],
      outcomes: [
        'Achieved fully automated CI/CD delivery with zero manual deployment steps.',
        'Ensured secure and reliable container images through integrated vulnerability scanning.',
        'Improved application uptime, scalability, and resilience using EKS autoscaling.',
        'Implemented complete observability with real-time monitoring and log aggregation.',
      ],
    },
    {
      id: 'aws-infra',
      title: 'AWS Infrastructure Automation — Highly Available Web App',
      category: 'Cloud-Infra',
      description: 'Automated the deployment of a scalable and fault-tolerant web application infrastructure on AWS using Terraform. Provisions VPC, subnets, security groups, EC2 instances, and an ALB.',
      link: 'https://github.com/mohamedfaseeh/Load-Balanced-Web-Application',
      techStack: ['AWS', 'Terraform', 'EC2', 'ALB', 'VPC', 'Nginx', 'Bash'],
      keyResponsibilities: [
        { title: 'Infrastructure as Code', items: [
          'Designed and implemented AWS infrastructure entirely using Terraform.',
          'Defined VPC, public subnets, Internet Gateway, Route Tables, Security Groups, EC2 Instances, and ALB.',
          'Used Terraform variables and outputs for flexible configuration.',
        ]},
        { title: 'Automation & Configuration', items: [
          'Implemented automated instance provisioning using user_data to install Nginx at launch.',
          'Configured Target Group and Health Checks within ALB.',
          'Verified automatic failover behavior when one instance becomes unhealthy.',
        ]},
      ],
      technologies: [
        { title: 'Cloud Platform', items: ['AWS (VPC, EC2, ALB, Internet Gateway, Security Groups)'] },
        { title: 'IaC Tool', items: ['Terraform'] },
        { title: 'Concepts', items: ['Infrastructure as Code, Load Balancing, High Availability'] },
      ],
      outcomes: [
        'Deployed a highly available, fault-tolerant web infrastructure with end-to-end automation.',
        'Implemented cross-AZ load balancing and automated Nginx provisioning.',
        'Designed a clean, modular IaC structure with reusable components.',
        'Validated automatic failover and ALB health checks.',
      ],
    },
    {
      id: 'iam-automation',
      title: 'AWS IAM User Provisioning (Python & boto3)',
      category: 'Automation',
      description: 'Automated the process of creating and managing AWS IAM users through a Python-based solution leveraging the AWS SDK (boto3).',
      link: 'https://github.com/mohamedfaseeh/AWS-IAM-User-Provisioning',
      techStack: ['Python', 'boto3', 'AWS IAM', 'AWS CLI'],
      keyResponsibilities: [
        { title: 'IAM User & Group Automation', items: [
          'Developed a Python script using boto3 to automate IAM user provisioning.',
          'Enabled optional AWS Console login for users with password reset enforcement.',
          'Automated policy attachment by allowing input of AWS-managed policies dynamically.',
        ]},
        { title: 'Security & Governance', items: [
          'Followed AWS best practices for secure credential management.',
          'Implemented input validation for password and policy names.',
          'Used IAM roles and policies for restricted permissions.',
        ]},
      ],
      technologies: [
        { title: 'Cloud & Infrastructure', items: ['AWS (IAM, CLI)'] },
        { title: 'Programming & SDK', items: ['Python, boto3'] },
        { title: 'Concepts', items: ['Automation, Access Management, Security'] },
      ],
      outcomes: [
        'Reduced manual IAM setup time by 90%.',
        'Delivered a secure, reusable Python-based automation tool.',
      ],
    },
    {
      id: 'auto-tagging',
      title: 'Auto-Tagging Automation using Lambda & EventBridge',
      category: 'Governance',
      description: 'Implemented a fully automated AWS resource tagging solution using CloudTrail, EventBridge, and AWS Lambda.',
      link: 'https://github.com/mohamedfaseeh/Auto-Tag-AWS-Resources',
      techStack: ['AWS Lambda', 'EventBridge', 'CloudTrail', 'Python', 'boto3', 'S3', 'EC2'],
      keyResponsibilities: [
        { title: 'Event-Driven Auto-Tagging', items: [
          'Designed a serverless automation engine using AWS Lambda (Python).',
          'Built a tagging mechanism that detects the resource creator using CloudTrail.',
          'Ensured successful tagging for EC2 instances and S3 buckets.',
        ]},
        { title: 'Lambda Function Development', items: [
          'Developed a Python-based AWS Lambda function using boto3.',
          'Implemented logic to parse events, identify creator ARN, and apply tags.',
          'Added logging and error handling for auditing.',
        ]},
      ],
      technologies: [
        { title: 'AWS Services', items: ['CloudTrail, EventBridge, Lambda, EC2, S3, IAM'] },
        { title: 'Programming', items: ['Python, boto3'] },
        { title: 'Concepts', items: ['Cloud Governance, Tagging Compliance, Serverless'] },
      ],
      outcomes: [
        'Ensured 100% tagging compliance for resource creators.',
        'Improved traceability, accountability, and cloud cost visibility.',
        'Eliminated manual tagging effort and human error.',
        'Built a scalable, event-driven automation system.',
      ],
    },
  ];

  readonly certifications: Certification[] = [
    {
      title: 'DevOps Foundations: Continuous Delivery/Continuous Integration',
      issuer: 'LinkedIn Learning',
      issuerIcon: 'assets/images/linkedin-blue.png',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/95df3634727619c033e956d2608d1e692bb3cb2e07261fa637cad7844d90c6e0',
    },
    {
      title: 'Learning Kubernetes',
      issuer: 'LinkedIn Learning',
      issuerIcon: 'assets/images/linkedin-blue.png',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/03bfe90026630ac738405a1635812306fbe1035fa3792f8eee98063d8b6800b5',
    },
    {
      title: 'Learning Terraform',
      issuer: 'LinkedIn Learning',
      issuerIcon: 'assets/images/linkedin-blue.png',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/e9f6ed65843712eb7543a621eb139b1b58e485f639a0f99fbb4638a5d46865d8',
    },
    {
      title: 'Docker Essential Training',
      issuer: 'LinkedIn Learning',
      issuerIcon: 'assets/images/linkedin-blue.png',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/8de520221a191fba12c68582a5d7730fffccb9e19ef96a9a8eba2448484903e8',
    },
  ];

  readonly experience: Experience[] = [
    {
      company: 'Chargebee',
      role: 'Cloud Reliability Engineer',
      period: 'April 2024 — Present',
      responsibilities: [
        'Monitored AWS infrastructure and resolved system/job errors.',
        'Deployed artifacts to EC2/ECS with pre-checks and PR reviews.',
        'Investigated and fixed build failures (5xx errors).',
        'Performed root cause analysis for critical incidents.',
        'Participated in 24/7 on-call rotations to ensure uptime.',
        
      ],
    },
    {
      company: 'Avasoft',
      role: 'Cloud & DevOps Engineer',
      period: 'Feb 2023 — Aug 2024',
      responsibilities: [
        'Managed EC2, Lambda, and S3 for scalable cloud hosting.',
        'Integrated APIs using AWS API Gateway.',
        'Enforced IAM policies and configured WAF for security.',
        'Built CI/CD pipelines with GitLab and Liquibase.',
        'Dockerized applications to ensure consistent deployments.',
        
      ],
    },
  ];

  readonly education: Education[] = [
    {
      degree: 'B.E., Computer Science and Engineering',
      institution: 'Dhaanish Ahmed College of Engineering',
      period: 'Aug 2019 — May 2023',
      details: 'Anna University | CGPA - 8.28 (82%)',
    },
  ];

  readonly contactInfo: ContactInfo = {
    phone: '+91 6384211442',
    email: 'mohamedfaseeh2001@gmail.com',
    linkedin: 'linkedin.com/in/mohamedfaseeh',
    linkedinUrl: 'https://linkedin.com/in/mohamedfaseeh',
    github: 'github.com/mohamedfaseeh',
    githubUrl: 'https://github.com/mohamedfaseeh',
    whatsappUrl: 'https://wa.me/916384211442',
  };
}
