import compress from 'koa-compress';
import zlib from 'zlib';

export default compress({
  // filter(content_type) {
  //   const allowContentTypes = [
  //     /^text$/,
  //     /^text\/html$/,
  //     /^application\/json$/,
  //   ];
  //   const valid = allowContentTypes.some(regex => regex.test(content_type));
  //   return valid;
  // },
  threshold: 2048,
  gzip: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
  deflate: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
  br: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
});
