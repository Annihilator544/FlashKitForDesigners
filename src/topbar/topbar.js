import { observer } from 'mobx-react-lite';
import {
  Navbar,
  Alignment,
} from '@blueprintjs/core';

import styled from 'polotno/utils/styled';

import { useProject } from '../plotNoFeatures/project';

import { FileMenu } from './file-menu';
import { DownloadButton } from './download-button';
import { Input } from '../components/ui/input';
import { LucideGem } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const NavbarContainer = styled('div')`
  white-space: nowrap;

  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`;

const NavInner = styled('div')`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

// const Status = observer(({ project }) => {
//   const Icon = !project.cloudEnabled
//     ? MdcCloudAlert
//     : project.status === 'saved'
//     ? MdcCloudCheck
//     : MdcCloudSync;
//   return (
//     <Popover
//       content={
//         <div style={{ padding: '10px', maxWidth: '300px' }}>
//           {!project.cloudEnabled && (
//             <CloudWarning style={{ padding: '10px' }} />
//           )}
//           {project.cloudEnabled && project.status === 'saved' && (
//             <>
//               You data is saved with{' '}
//               <a href="https://puter.com" target="_blank">
//                 Puter.com
//               </a>
//             </>
//           )}
//           {project.cloudEnabled &&
//             (project.status === 'saving' || project.status === 'has-changes') &&
//             'Saving...'}
//         </div>
//       }
//       interactionKind="hover"
//     >
//       <div style={{ padding: '0 5px' }}>
//         <Icon className="bp5-icon" style={{ fontSize: '25px', opacity: 0.8 }} />
//       </div>
//     </Popover>
//   );
// });

export default observer(({ store }) => {
  const project = useProject();

  return (
    <NavbarContainer className="bp5-navbar">
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          <FileMenu store={store} project={project} />
          <div
            style={{
              paddingLeft: '20px',
              maxWidth: '200px',
            }}
          >
            
          </div>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {/* <Status project={project} /> */}
{/* 
          <AnchorButton
            href="https://polotno.com"
            target="_blank"
            minimal
            icon={
              <BiCodeBlock className="bp5-icon" style={{ fontSize: '20px' }} />
            }
          >
            API
          </AnchorButton>

          <AnchorButton
            minimal
            href="https://discord.gg/W2VeKgsr9J"
            target="_blank"
            icon={
              <FaDiscord className="bp5-icon" style={{ fontSize: '20px' }} />
            }
          >
            Join Chat
          </AnchorButton>
          <AnchorButton
            minimal
            href="https://github.com/lavrton/polotno-studio"
            target="_blank"
            icon={
              <FaGithub className="bp5-icon" style={{ fontSize: '20px' }} />
            }
          ></AnchorButton>
          <AnchorButton
            minimal
            href="https://twitter.com/lavrton"
            target="_blank"
            icon={
              <FaTwitter className="bp5-icon" style={{ fontSize: '20px' }} />
            }
          ></AnchorButton> */}
          { localStorage.getItem("flashkitPlan") === "FLASHKITUNLIMITED" ?
                                <Button className="font-semibold flex gap-1 mr-4" onClick={()=>window.location.href="/billing"}>
                                    <LucideGem className="h-5"/> Upgrade<Badge className="bg-[#ffeae9] text-[#F56B63] rounded-sm hover:bg-[#ffeae9]">Pro</Badge>
                                </Button>
                            : 
                            <></>}
          <div className='flex gap-4'>
          <Input
              value={window.project.name}
              placeholder="Design name"
              onChange={(e) => {
                window.project.name = e.target.value;
                window.project.requestSave();
                console.log(window.project.name);
              }}
              className={' bg-white '}
            />
          <DownloadButton store={store} />
          </div>
          {/* <UserMenu store={store} project={project} /> */}
          {/* <NavbarHeading>Polotno Studio</NavbarHeading> */}
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
});
