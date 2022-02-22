import React from "react";

type ScriptType = "channelTalk" | "ga";
const scriptReducer = (type: ScriptType) => {
  switch (type) {
    case "channelTalk":
      return `
      (function() {
        var w = window;
        if (w.ChannelIO) {
          return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
        }
        var ch = function() {
          ch.c(arguments);
        };
        ch.q = [];
        ch.c = function(args) {
          ch.q.push(args);
        };
        w.ChannelIO = ch;
        function l() {
          if (w.ChannelIOInitialized) {
            return;
          }
          w.ChannelIOInitialized = true;
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
          s.charset = 'UTF-8';
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        }
        if (document.readyState === 'complete') {
          l();
        } else if (window.attachEvent) {
          window.attachEvent('onload', l);
        } else {
          window.addEventListener('DOMContentLoaded', l, false);
          window.addEventListener('load', l, false);
        }
      })();
      ChannelIO('boot', {
        "pluginKey": "d43da6e3-f8bd-425e-b3fd-84d305acf3f1"
      });
      `;
    case "ga":
      return `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Z86GXLJ71X');
      `;
    default:
      return ``;
  }
};

const ExternalScript = () => {
  return (
    <>
      {/* 채널 톡 */}
      <script
        dangerouslySetInnerHTML={{
          __html: scriptReducer("channelTalk"),
        }}
      />

      {/* 구글 애널리틱스 */}
      {/*  eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Z86GXLJ71X"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: scriptReducer("ga"),
        }}
      />
    </>
  );
};

export default ExternalScript;
