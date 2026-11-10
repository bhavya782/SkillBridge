/**
 * SkillBridge AI Talent Engine & Intelligence Services
 * Provides mathematically grounded, transparent algorithms for:
 * 1. AI Talent Matching
 * 2. Smart Bid Analysis
 * 3. Skill Gap Detection
 * 4. Transparent Trust Score Calculation
 */

export class IntelligenceEngine {
  /**
   * AI Talent Match: Compares freelancer profile with project requirements
   */
  static calculateTalentMatch(freelancer, project) {
    const projectSkills = (project.skillsRequired || []).map((s) => s.toLowerCase().trim());
    const freelancerSkills = (freelancer.skills || []).map((s) => s.toLowerCase().trim());

    // 1. Skill Match Weight (45%)
    let matchedSkills = [];
    let missingSkills = [];

    if (projectSkills.length === 0) {
      matchedSkills = [...freelancerSkills];
    } else {
      projectSkills.forEach((reqSkill) => {
        const found = freelancerSkills.some((fSkill) => fSkill.includes(reqSkill) || reqSkill.includes(fSkill));
        if (found) {
          matchedSkills.push(reqSkill);
        } else {
          missingSkills.push(reqSkill);
        }
      });
    }

    const skillScore = projectSkills.length > 0 
      ? (matchedSkills.length / projectSkills.length) * 100 
      : 80;

    // 2. Experience Level Compatibility (25%)
    let expScore = 70;
    const years = freelancer.experienceYears || 1;
    if (project.experienceLevel === 'Entry') {
      expScore = 100;
    } else if (project.experienceLevel === 'Intermediate') {
      expScore = years >= 2 ? 100 : years * 45;
    } else if (project.experienceLevel === 'Expert') {
      expScore = years >= 5 ? 100 : Math.max(30, years * 18);
    }

    // 3. Budget / Hourly Rate Compatibility (15%)
    let budgetScore = 80;
    const estTotalRate = (freelancer.hourlyRate || 30) * 20; // 20 hours est
    if (estTotalRate >= project.budgetMin && estTotalRate <= project.budgetMax) {
      budgetScore = 95;
    } else if (estTotalRate < project.budgetMin) {
      budgetScore = 90; // High value bargain
    } else {
      budgetScore = Math.max(40, 100 - ((estTotalRate - project.budgetMax) / project.budgetMax) * 50);
    }

    // 4. Reputation & Availability Weight (15%)
    const trustScore = freelancer.trustScore || 85;
    const availBonus = freelancer.availability === 'available' ? 10 : 0;
    const repScore = Math.min(100, (trustScore * 0.9) + availBonus);

    // Weighted Overall Score
    const overallScore = Math.round(
      (skillScore * 0.45) +
      (expScore * 0.25) +
      (budgetScore * 0.15) +
      (repScore * 0.15)
    );

    const clampedScore = Math.min(99, Math.max(25, overallScore));

    // Transparent reasoning explanation
    const explanations = [];
    if (matchedSkills.length > 0) {
      explanations.push(`Direct match on ${matchedSkills.length} required skill(s): ${matchedSkills.slice(0, 3).join(', ')}.`);
    }
    if (missingSkills.length === 0) {
      explanations.push(`Complete skill coverage matching 100% of the project's stack.`);
    } else {
      explanations.push(`Skill gap on: ${missingSkills.slice(0, 2).join(', ')}.`);
    }
    if (expScore >= 90) {
      explanations.push(`Proven ${years} yrs background aligns well with ${project.experienceLevel} requirement.`);
    }
    if (budgetScore >= 85) {
      explanations.push(`Proposed rate profile sits comfortably within client's $${project.budgetMin}–$${project.budgetMax} budget.`);
    }

    return {
      matchPercentage: clampedScore,
      matchedSkills,
      missingSkills,
      explanation: explanations.join(' '),
      metrics: {
        skillScore: Math.round(skillScore),
        expScore: Math.round(expScore),
        budgetScore: Math.round(budgetScore),
        repScore: Math.round(repScore),
      },
    };
  }

  /**
   * Smart Bid Analyzer: Evaluates freelancer proposal quality before client review
   */
  static analyzeBid(bidData, project) {
    const { bidAmount, deliveryDays, coverLetter, freelancerExperience = 2 } = bidData;
    const recommendations = [];
    let score = 85;

    // Budget Compatibility
    let budgetCompatibility = 'Within Budget';
    if (bidAmount < project.budgetMin * 0.6) {
      budgetCompatibility = 'Significantly Below Budget (High Risk of Under-delivering)';
      score -= 15;
      recommendations.push('Your bid is far below client budget. Clients may perceive low quality or scope underestimation.');
    } else if (bidAmount < project.budgetMin) {
      budgetCompatibility = 'Competitive / Below Range';
      score += 5;
    } else if (bidAmount > project.budgetMax * 1.3) {
      budgetCompatibility = 'Over Budget';
      score -= 20;
      recommendations.push('Your bid exceeds maximum client budget. Provide strong value justification in your cover letter.');
    } else {
      budgetCompatibility = 'Optimal Budget Alignment';
      score += 10;
    }

    // Delivery Feasibility
    let deliveryFeasibility = 'Realistic';
    if (deliveryDays < 2 && project.budgetMax > 500) {
      deliveryFeasibility = 'Aggressive / High Risk';
      score -= 10;
      recommendations.push('Estimated delivery duration may be too tight for full testing and revisions.');
    } else {
      deliveryFeasibility = 'Realistic';
    }

    // Cover Letter Completeness
    const wordCount = (coverLetter || '').trim().split(/\s+/).length;
    let completenessScore = Math.min(100, Math.max(20, Math.round((wordCount / 80) * 100)));
    if (wordCount < 30) {
      recommendations.push('Add specific details on how your approach solves the client\'s unique problem.');
      score -= 15;
    } else {
      recommendations.push('Proposal is comprehensive with solid technical details.');
    }

    return {
      score: Math.min(99, Math.max(35, score)),
      budgetCompatibility,
      deliveryFeasibility,
      completenessScore,
      recommendations,
    };
  }

  /**
   * Skill Gap Detector: Analyzes what a freelancer needs to learn for a project
   */
  static detectSkillGaps(freelancerSkills = [], projectSkills = []) {
    const fLower = freelancerSkills.map((s) => s.toLowerCase().trim());
    const pLower = projectSkills.map((s) => s.toLowerCase().trim());

    const possessedSkills = [];
    const missingSkills = [];
    const suggestedLearning = [];

    pLower.forEach((pSkill) => {
      if (fLower.includes(pSkill)) {
        possessedSkills.push(pSkill);
      } else {
        missingSkills.push(pSkill);
        // Suggest related tech or learning pathways
        if (pSkill.includes('docker') || pSkill.includes('kubernetes')) {
          suggestedLearning.push('Containerization & CI/CD Pipelines (Docker/K8s)');
        } else if (pSkill.includes('react') || pSkill.includes('next')) {
          suggestedLearning.push('Modern SSR & Component Lifecycle (Next.js)');
        } else if (pSkill.includes('ai') || pSkill.includes('python')) {
          suggestedLearning.push('LLM Integration & Prompt Engineering');
        } else {
          suggestedLearning.push(`Official documentation & quickstart for ${pSkill}`);
        }
      }
    });

    const compatibility = pLower.length > 0 
      ? Math.round((possessedSkills.length / pLower.length) * 100) 
      : 100;

    return {
      compatibilityPercentage: compatibility,
      possessedSkills,
      missingSkills,
      suggestedLearning: [...new Set(suggestedLearning)],
      recommendation: compatibility >= 70 
        ? 'High match! You are a strong candidate for this project.' 
        : 'Moderate match. Highlighting fast learning curve in proposal is recommended.',
    };
  }

  /**
   * Freelancer Trust Score Calculation: Multi-factor verifiable reputation
   */
  static computeTrustScore(profile, reviews = []) {
    // 1. Completed projects (max 30 pts)
    const completedCount = profile.completedProjectsCount || 0;
    const projectScore = Math.min(30, completedCount * 6);

    // 2. Average Client Rating (max 30 pts)
    const avgRating = profile.averageRating || 5.0;
    const ratingScore = Math.round((avgRating / 5) * 30);

    // 3. On-time delivery rate (max 20 pts)
    const onTimeReviews = reviews.filter((r) => r.onTimeDelivery).length;
    const onTimeScore = reviews.length > 0 
      ? Math.round((onTimeReviews / reviews.length) * 20) 
      : 18;

    // 4. Portfolio evidence verification (max 20 pts)
    let evidenceScore = 5;
    if (profile.githubUrl) evidenceScore += 5;
    if (profile.linkedinUrl) evidenceScore += 5;
    if (profile.portfolioUrl) evidenceScore += 5;

    const total = projectScore + ratingScore + onTimeScore + evidenceScore;
    const finalScore = Math.min(100, Math.max(40, total));

    return {
      trustScore: finalScore,
      factors: {
        completedProjects: { score: projectScore, max: 30, count: completedCount },
        clientRatings: { score: ratingScore, max: 30, average: avgRating },
        onTimeDelivery: { score: onTimeScore, max: 20 },
        verifiedEvidence: { score: evidenceScore, max: 20 },
      },
    };
  }
}
