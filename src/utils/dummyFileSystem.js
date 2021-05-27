import md5 from "md5"
const dummyFileSystem = {
  '1382b6993e9f270cb1c29833be3f5750': {
    type: '__folder__',
    name: 'root',
    path: '/',
    size: 0,
    date: '2019-04-07',
    creatorName: 'admin',
    parentPath: null,
    parentID: null,
    children: [
      md5("/SarvvidBox" + "__folder__")
    ]
  },
};

const generatedummyFileSystem = () => {
  localStorage.setItem('fileSystem', JSON.stringify(dummyFileSystem));
  return dummyFileSystem;
};

export default generatedummyFileSystem;
