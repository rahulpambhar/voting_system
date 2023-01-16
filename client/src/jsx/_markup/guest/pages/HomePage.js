import React, { useState } from 'react';

import useServiceContextHook from '../../../_hooks/service.context.hook'

function Home() {
  const { hello } = useServiceContextHook()

  return (
    <>
      {hello}
      This is Home page
    </>
  );
}

export default Home;
