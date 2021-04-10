import { APIGatewayEvent } from 'aws-lambda';
import serverRender from './server/middleware/serverRender';
import { stringify } from 'qs';
import axios from 'axios';

export const handler = async (event: APIGatewayEvent) => {
  const query = event.queryStringParameters
    ? stringify(event.queryStringParameters)
    : '';
  const url = query ? event.path.concat('?', query) : event.path;
  //   const cookie = event.headers.Cookie || '';
  //   const loggedIn =
  //   cookie.includes('refresh_token') || cookie.includes('access_token');

  if (/^\/sitemaps\/(index\.xml|general\.xml)$/.test(url)) {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}${url}`,
      );
      return {
        statusCode: 200,
        headers: {
          'content-type': 'text/xml; charset=utf-8;',
        },
        body: data,
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: 'Unknown Error',
          e,
        }),
      };
    }
  }

  try {
    const result = await serverRender({
      url,
    });
    if (!result) throw new Error('Result is null');

    const { html, statusCode } = result;

    return {
      statusCode: statusCode,
      headers: {
        'content-type': 'text/html; charset=utf-8;',
      },
      body: html,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: 'SSR has crashed',
        e,
      }),
    };
  }
};
