import * as clientService from '../services/clientServices.js';

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const createClients = async (req, res) => {
  try {
    const clientData = await req.body; 
    const newClient = await clientService.createClients(clientData);
    res.status(200).json(newClient);
  } catch (error) {
    console.error('Error creating clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const updateClients = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientData = req.body; 
    const updateClient = await clientService.updateClients(clientId,clientData);

    if(!updateClient) {
      return res.status(404).json({ error: 'Client not found' });
    } 
    res.status(200).json(updateClient);
  } catch (error) {
    console.error('Error updating clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteClients = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deleted = await clientService.deleteClients(clientId);
    if (!deleted) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(deleted);
  } catch (error) {
    console.error('Error deleting clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const searchClients = async (req, res) => {
  try {
    const searchTerm = req.query.q; 
    const clients = await clientService.searchClients(searchTerm);

    res.status(200).json(clients);
  } catch (error) {
    console.error('Error searching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}