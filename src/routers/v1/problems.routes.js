const express = require('express');
const { ProblemController } = require('../../controllers');
const problemRouter = express.Router();
// If any request comes and route continues with /ping, we map it to pingProblemController
problemRouter.get('/ping', ProblemController.pingProblemControllers);
problemRouter.get('/:id', ProblemController.getProblem);
problemRouter.get('/', ProblemController.getProblems);
problemRouter.post('/:id', ProblemController.addProblem);
problemRouter.delete('/:id', ProblemController.deleteProblem);
problemRouter.put('/:id', ProblemController.updateProblem);
module.exports = problemRouter;
