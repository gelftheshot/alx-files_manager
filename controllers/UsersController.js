import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const useremail = request.body.email;
    const userpassword = request.body.password;

    if (!useremail) {
      return response.status(400).send({ error: 'Missing email' });
    }
    if (!userpassword) {
      return response.status(400).send({ error: 'Missing password' });
    }

    if (await dbClient.db.collection('user').findOne({ email: useremail })) {
      response.status(400).send({ error: 'Already exist' });
    }

    const hpwd = sha1(userpassword);
    const newuser = await dbClient.db.collection('user').insertOne({email: useremail, password: hpwd});

    return response.status(200).send({ id: newuser.insertedId, email: useremail });
  }
}

export default UsersController;
