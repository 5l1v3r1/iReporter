/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */

import incident from '../data/incident';
import saveNewIncident from '../helpers/index.helper';

const result = incident.filter(res1 => res1.type === 'red-flag');

/**
 * check if the incident id is correct
 * @param  {Object} req the request object
 * @return  {Function} calls the next middleware if test passes
 */
function checkIncident(req) {
  return incident.find(dbIncident => dbIncident.id === parseInt(req, 10) && dbIncident.type === 'red-flag');
}

/** Class representing interventtion records */
class redFlagController {
  /**
   * Get all red flag records.
   * @param {object} req the request object.
   * @param {object} res the response object.
   * @return  {Function} next calls the next middleware
   *
   */
  getAllRedFlags(req, res) {
    return res.status(200).send({
      status: 200,
      data: [{
        message: 'All Red Flag Records successfully retrieved',
        result,
      }]
    });
  }

  /**
   * Get a specific red flag record.
   * @param {object} req the request object.
   * @param {object} res the response object.
   * @return  {Function} next calls the next middleware
   *
   */
  getRedFlag(req, res) {
    const data = checkIncident(req.params.id);
    // console.log(id);
    if (data !== undefined) {
      return res.status(200).send({
        status: 200,
        data: [{
          message: 'Record retrieved successfully',
          data,
        }],
      });
    }
    return res.status(400).send({
      status: 400,
      error: 'That id does not belong to a red flag record',
    });
  }

  /**
   * Create a new red flag record.
   * @param {object} req the request object.
   * @param {object} res the response object.
   * @return  {Function} next calls the next middleware
   *
   */
  createRedFlag(req, res) {
    const requestBody = req.body;
    const newIncident = saveNewIncident(
      requestBody.title, requestBody.createdBy, requestBody.type, requestBody.location,
      requestBody.status, requestBody.attachment, requestBody.comment
    );

    return res.status(201).send({
      status: 201,
      data: [{
        message: 'Red flag Record added successfully',
        newIncident: newIncident[newIncident.length - 1],
      }]
    });
  }

  /**
   * Update a red flag record.
   * @param {object} req the request object.
   * @param {object} res the response object.
   * @return  {Function} next calls the next middleware
   *
   */
  updateRedFlag(req, res) {
    const incidentId = checkIncident(req.params.id);

    if (incidentId !== undefined) {
      incidentId.title = req.body.title;
      incidentId.createdOn = req.body.createdOn;
      incidentId.createdBy = req.body.createdBy;
      incidentId.type = req.body.type;
      incidentId.location = req.body.location;
      incidentId.status = req.body.status;
      incidentId.Images = req.body.Images;
      incidentId.Videos = req.body.Videos;
      incidentId.comment = req.body.comment;
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'Incident record updated successfully',
          incidentId,
        }],
      });
    }
    return res.status(400).send({
      status: 400,
      error: 'That id does not belong to a red flag record',
    });
  }

  /**
   * Delete a red flag record.
   * @param {object} req the request object.
   * @param {object} res the response object.
   * @return  {Function} next calls the next middleware
   *
   */
  deleteRedFlag(req, res) {
    // check if it exists
    const incidentId = checkIncident(req.params.id);

    if (incidentId !== undefined) {
      // Delete the incident
      // using its id
      const index = incident.indexOf(incidentId);
      incident.splice(index, 1);

      // Return it
      const delResult = incident.filter(res1 => res1.type === 'red-flag');

      return res.status(200).send({
        status: 200,
        data: [{
          message: 'Incident Deleted successfully',
          delResult,
        }]
      });
    }
    return res.status(400).send({
      status: 400,
      error: 'That id does not belong to a red flag record',
    });
  }
}

const redflagController = new redFlagController();
export default redflagController;
