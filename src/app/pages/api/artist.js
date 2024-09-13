import { getArtistInfo } from '../../lib/artist';

export default function handler(req, res) {
  const { name } = req.query;
  const artistInfo = getArtistInfo(name);
  if (artistInfo) {
    res.status(200).json(artistInfo);
  } else {
    res.status(404).json({ error: 'Artist not found' });
  }
}
