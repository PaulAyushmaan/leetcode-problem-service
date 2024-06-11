const sanitizeMarkdownContent = require('../utils/markdownSanitizer');

class ProblemService {
	constructor(problemRepository) {
		this.problemRepository = problemRepository;
	}
	async createProblem(problemData) {
		// Sanitize the markdown for description
		problemData.description = sanitizeMarkdownContent(problemData.description);
		console.log('problem data', problemData);
		const problem = await this.problemRepository.createProblem(problemData);
		console.log('problem created', problem);
		return problem;
	}
	async getAllProblems() {
		const problems = await this.problemRepository.getAllProblems();
		return problems;
	}
	async getProblem(problemId) {
		const problem = await this.problemRepository.getProblem(problemId);
		return problem;
	}
	async deleteProblem(problemId) {
		const problem = await this.problemRepository.deleteProblem(problemId);
		return problem;
	}
}
module.exports = ProblemService;
