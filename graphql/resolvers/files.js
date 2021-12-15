const { UserInputError, AuthenticationError } = require('apollo-server-express');
// const File = require('../../models/File');

const { finished } = require('stream/promises');
const path = require('path');

const fileResolvers = {
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require('fs').createWriteStream(path.join(__dirname, `/public/images/${filename}`));
      stream.pipe(out);
      await finished(out);

      return { 
        url: `http://localhost:5000/images/${filename}`,
       };
    },
  },
};

module.exports = fileResolvers;