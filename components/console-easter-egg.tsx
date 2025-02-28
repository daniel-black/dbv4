"use client";

import { useEffect } from "react";

const asciiArtAndMessage = `
%c                                                                                        
                           ▏▎ ▎                                                                     
                           ▎▃▊▅▃▏▌▌▍▎▏                                                              
                           ▏▁▂▇▄▇▄▅▅▅▅▂▊▍                                                           
                          ▌▊▊▍▋▉▌ ▎▉▂▃▅▁▃▂▂▊                                                        
                        ▏▊▌▏▉▋  ▄▍   ▎▊▅▇▇▄▅▃▋▍                                                     
                      ▏▋▋▏▎▌▌  ▎▄▇▎    ▏▌▃▅▃▄▆▄▄▎                                                   
                      ▄▅▊▍▃▅█▊▊▊▁█▆▎      ▍▄██▆▅▉▍                                                  
                      ▌▆█▇▁▍▏    ▁▊▌         ▍▌▉▄▉▍▎▏     ▏▎▎▎▎▎▎▎▎▏                                
                                 ▏▁▎▏             ▍▍▋▋▋▋▋▋▊▊▌▍▍▍▍▍▍▋▊▋▎                             
                                  ▎▂▎                        ▏ ▏      ▌▃▉▊▋▎▏                       
                                   ▂▄▎                        ▊▏      ▏▍█▅▍▌▊▊▏                     
                                   ▄▋▅▎       ▏▁             ▌▅▏     ▏▉▊▅▇▇▆▁▏▋▋▏                   
                                   ▇▄▆▄▊▊▎▏  ▏▅▄           ▎▋▅▋    ▍▉▇█▆▍▋▄██▇▊▎▋▊▌▋▊▌▎▎            
                                 ▎▋▋▅██▅▊▋▌▏ ▁█▇▉▌     ▎▋▁▄██▄▏▏▍▂▆███▅▌  ▊▆▂▇█▇▄▂▊▂▂▃▄▄▊▁▊         
                               ▎▋▌▊▅▆▂▋▏▏▎▊▇▂▅▆▇████████▆████▂  ▏▅██▃▌     ▍▋▁▃▅▇████▆▅▁▊▍          
                             ▍▊▉▃█▁▊▂▆▂▂▁▋▋▍▎  ▏▍▍▍▍▍▍▍▎ ▅███▂  ▂▇▋▏          ▍▊▋▂▄▂▁▉▍▍            
                            ▍▄▄▆▉▂▂█▍                    ▌███▂ ▁▆▋                                  
                          ▏▊▂▅▊▏  ▁▂▂▏                   ▌███▃▍▆▅                                   
                         ▍▁▊▇▋     ▁▁▁▌▋▌▏             ▌▅█▇▃▄▋▅▆▂                                   
                        ▌▉▂▅▋       ▉▃██▄▅          ▎▊▅█▃▊▋▂▄▅▊▎                                    
                       ▊▋▁▆▉           ▎▌▊          ▄▁▅▁▋▃▄▉▎                                       
                       ▌▌▌▎                        ▌▃▅▃▃▇▃▏                                         
                                                ▎▍▊▊▊▂▊█▄▍▌▋▎▌ ▎  ▏▍▏                               
                                                ▏▏▎▎▎▎▎▎▎▎▎▎▏▏ ▏  ▏▎▏                               
     
                                                
  Ah so we meet again in the console.
  

  Thank you for checking out my site.
  As a token of my gratitude, please enjoy this ASCII horse ^.

  If you want to explore the code behind my site, you can find it here:
  https://github.com/daniel-black/dbv4
  
  Let's chat sometime: drblack651@gmail.com
  `;

const style = "color: #42f5ef; font-weight: bold; font-size: 12px;";

export function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(asciiArtAndMessage, style);
  }, []);

  return null;
}
