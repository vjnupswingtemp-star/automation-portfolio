'use client'
import { useEffect } from 'react'
import { getCalApi } from "@calcom/embed-react"

export function CalProvider() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        "styles": {
          "branding": {
            "brandColor": "#3662E3"
          }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, [])
  return null
}
