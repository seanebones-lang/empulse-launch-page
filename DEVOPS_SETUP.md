# 🚀 DevOps Automation Setup Guide - EmPulse Launch Page

**Date:** January 15, 2026
**DevOps Specialist:** NextEleven Engineering Team

This guide implements comprehensive CI/CD automation for the EmPulse launch page with Railway backend and Vercel frontend deployments.

## 📋 Prerequisites

- Railway account with project access
- Vercel account with project access
- GitHub repository with admin access
- xAI API key for voice functionality

## 🔐 Required Secrets Configuration

### GitHub Repository Secrets

Navigate to: **Repository Settings → Secrets and Variables → Actions**

Add the following secrets:

#### Railway Configuration
```
RAILWAY_TOKEN=<your-railway-cli-token>
RAILWAY_PROJECT_ID=52ffd68a-ac6f-48bf-9fc8-5793efad4971
RAILWAY_BACKEND_SERVICE_ID=e1c06f6a-72f8-44cd-ad4a-4e2e3cec7b19
RAILWAY_BACKEND_URL=https://your-app.up.railway.app
```

#### Vercel Configuration
```
VERCEL_TOKEN=<your-vercel-cli-token>
VERCEL_FRONTEND_URL=https://your-app.vercel.app
```

#### API Keys & Environment
```
XAI_API_KEY=<your-xai-api-key>
NEXT_PUBLIC_BACKEND_URL=https://your-app.up.railway.app
```

#### Monitoring & Alerting (Optional)
```
SLACK_WEBHOOK_URL=<your-slack-webhook-url>
EMAIL_RECIPIENTS=user1@example.com,user2@example.com
```

## 🛠️ Getting Railway CLI Token

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and get token:
```bash
railway login
railway whoami
# Copy the token from the output
```

## 🎯 Getting Vercel CLI Token

1. Go to Vercel Dashboard → Account Settings → Tokens
2. Create new token with "Create Token" button
3. Copy the generated token

## 🚀 Deployment Workflow

### Step 1: Initial Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers for E2E testing
npx playwright install

# Run tests locally
npm test
npm run test:e2e
```

### Step 2: Environment Variables

#### Railway (Backend)
In Railway Dashboard → Your Service → Variables:
```
XAI_API_KEY=<your-xai-api-key>
PORT=8000
```

#### Vercel (Frontend)
In Vercel Dashboard → Your Project → Settings → Environment Variables:
```
NEXT_PUBLIC_BACKEND_URL=https://your-app.up.railway.app
```

### Step 3: Push to GitHub

```bash
git add .
git commit -m "feat: Add comprehensive DevOps automation with CI/CD, monitoring, and security"
git push origin main
```

## 📊 CI/CD Pipeline Overview

The automation includes:

### 1. **Deployment Pipeline** (`.github/workflows/deploy.yml`)
- **Triggers:** Push to main/develop, Pull Requests
- **Frontend:** ESLint → Build → Deploy to Vercel
- **Backend:** Python tests → Deploy to Railway
- **Preview:** PR deployments with Vercel preview URLs

### 2. **Monitoring Pipeline** (`.github/workflows/monitoring.yml`)
- **Triggers:** Every 5 minutes + manual
- **Checks:** Backend health, Frontend connectivity, WebSocket tests
- **Alerts:** Slack notifications on failures

### 3. **Security Pipeline** (`.github/workflows/security.yml`)
- **Triggers:** Push, PR, Weekly schedule
- **Scans:** Secrets, Dependencies, CodeQL analysis, Compliance

### 4. **Testing Strategy**
- **Unit Tests:** Jest for React components
- **Integration Tests:** API endpoint testing
- **E2E Tests:** Playwright for critical user journeys
- **Backend Tests:** pytest with async support

## 🔍 Monitoring & Alerting

### Health Checks
- Backend: `/healthz` endpoint every 5 minutes
- Frontend: HTTP connectivity check
- WebSocket: Connection handshake validation
- Performance: Response time monitoring (< 3s threshold)

### Alert Channels
- **Slack:** Real-time alerts with actionable buttons
- **GitHub Issues:** Automatic issue creation for failures
- **Email:** Critical system alerts (optional)

## 🔒 Security Features

### Automated Scanning
- **Secrets Detection:** TruffleHog scans for exposed credentials
- **Dependency Analysis:** OWASP checks for vulnerabilities
- **Code Security:** GitHub CodeQL static analysis
- **Compliance:** License and security file validation

### Secrets Management
- **GitHub Secrets:** Encrypted environment variables
- **Railway Variables:** Service-specific configuration
- **Vercel Variables:** Frontend environment settings

## 🧪 Testing Strategy

### Frontend Testing
```bash
# Unit tests
npm test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# E2E with UI
npm run test:e2e:ui
```

### Backend Testing
```bash
cd backend

# Unit tests
pytest

# With coverage
pytest --cov=app

# Specific test
pytest tests/test_health.py
```

## 📈 Performance Optimization

### Railway Optimization
- **Auto-scaling:** Railway handles horizontal scaling
- **Caching:** Built-in CDN and caching
- **Monitoring:** Real-time metrics in dashboard

### Vercel Optimization
- **Edge Network:** Global CDN deployment
- **Image Optimization:** Next.js automatic optimization
- **Analytics:** Built-in performance monitoring

## 🚨 Incident Response

### Automated Response
1. **Detection:** Monitoring workflows detect issues
2. **Alert:** Slack/email notifications sent
3. **Investigation:** Direct links to GitHub Actions and Railway dashboard
4. **Rollback:** Manual rollback via Railway CLI if needed

### Manual Intervention
```bash
# Check Railway logs
railway logs --follow

# Redeploy specific service
railway up --service <service-id>

# Check Vercel deployments
vercel ls
```

## 📚 Maintenance Tasks

### Weekly
- Review security scan reports
- Update dependencies
- Rotate API keys

### Monthly
- Review monitoring dashboards
- Update runtime versions
- Audit access permissions

### Quarterly
- Complete security audit
- Performance optimization review
- Infrastructure cost analysis

## 🔧 Troubleshooting

### Common Issues

**Railway Deployment Fails:**
```bash
# Check Railway CLI status
railway status

# View deployment logs
railway logs --recent

# Redeploy manually
railway up
```

**Vercel Deployment Fails:**
```bash
# Check Vercel CLI
vercel --debug

# View deployment logs in dashboard
# Check NEXT_PUBLIC_BACKEND_URL variable
```

**Tests Failing:**
```bash
# Run tests locally
npm test

# Check environment variables
echo $NEXT_PUBLIC_BACKEND_URL

# Update test configuration if needed
```

## 📞 Support

For DevOps automation issues:
1. Check GitHub Actions logs first
2. Review Railway/Vercel dashboards
3. Check monitoring alerts
4. Create issue with detailed logs

---

**🎯 Result:** Fully automated deployment pipeline with Railway backend and Vercel frontend, comprehensive monitoring, security scanning, and testing strategy implemented as of January 15, 2026.