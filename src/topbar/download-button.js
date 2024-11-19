import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Position,
  Menu,
  HTMLSelect,
  Popover,
} from '@blueprintjs/core';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import JSZip from 'jszip';
import { downloadFile } from 'polotno/utils/download';
import * as unit from 'polotno/utils/unit';
import { t } from 'polotno/utils/l10n';
import { LucideDownload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';

const saveAsVideo = async ({ store, pixelRatio, fps, onProgress }) => {
  const json = store.toJSON();
  const req = await fetch(
    'https://api.polotno.dev/api/renders?KEY=nFA5H9elEytDyPyvKL7T',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        design: json,
        pixelRatio,
        format: 'mp4',
      }),
    }
  );
  const job = await req.json();
  while (true) {
    const jobReq = await fetch(
      `https://api.polotno.dev/api/renders/${job.id}?KEY=nFA5H9elEytDyPyvKL7T`
    );
    const jobData = await jobReq.json();
    if (jobData.status === 'done') {
      downloadFile(jobData.output, 'polotno.mp4');
      break;
    } else if (jobData.status === 'error') {
      throw new Error('Failed to render video');
    } else {
      onProgress(jobData.progress, jobData.status);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};

export const DownloadButton = observer(({ store }) => {
  const [saving, setSaving] = React.useState(false);
  const [quality, setQuality] = React.useState(1);
  const [pageSizeModifier, setPageSizeModifier] = React.useState(1);
  const [fps, setFPS] = React.useState(10);
  const [type, setType] = React.useState('png');
  const [progress, setProgress] = React.useState(0);
  const [progressStatus, setProgressStatus] = React.useState('scheduled');
  const getName = () => {
    const texts = [];
    store.pages.forEach((p) => {
      p.children.forEach((c) => {
        if (c.type === 'text') {
          texts.push(c.text);
        }
      });
    });
    const allWords = texts.join(' ').split(' ');
    const words = allWords.slice(0, 6);
    return words.join(' ').replace(/\s/g, '-').toLowerCase() || 'LiftCo';
  };

  const maxQuality = type === 'mp4' ? 1 : 300 / 72;
  return (
    <>
    {/* <Popover
      content={
        <Menu>
          <li className="bp5-menu-header">
            <h6 className="bp5-heading">File type</h6>
          </li>
          <HTMLSelect
            fill
            onChange={(e) => {
              setType(e.target.value);
              console.log(e.target.value, "e.target.value");
              setQuality(1);
            }}
            value={type}
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
            <option value="html">HTML</option>
            <option value="svg">SVG</option>
            <option value="json">JSON</option>
            <option value="gif">GIF</option>
            <option value="mp4">MP4 Video (Beta)</option>
          </HTMLSelect>

          {/* {type !== 'json' && type !== 'html' && type !== 'svg' && (
            <>
              <li className="bp5-menu-header">
                <h6 className="bp5-heading">Quality</h6>
              </li>
              <div style={{ padding: '10px' }}>
                <Slider
                  value={quality}
                  labelRenderer={false}
                  onChange={(quality) => {
                    setQuality(quality);
                  }}
                  stepSize={0.2}
                  min={0.2}
                  max={maxQuality}
                  showTrackFill={false}
                />
                {type === 'pdf' && (
                  <div>DPI: {Math.round(store.dpi * quality)}</div>
                )}
                {type !== 'pdf' && (
                  <div>
                    {Math.round(store.width * quality)} x{' '}
                    {Math.round(store.height * quality)} px
                  </div>
                )}
                {type === 'gif' && (
                  <>
                    <li className="bp5-menu-header">
                      <h6 className="bp5-heading">FPS</h6>
                    </li>
                    <div style={{ padding: '10px' }}>
                      <Slider
                        value={fps}
                        // labelRenderer={false}
                        labelStepSize={5}
                        onChange={(fps) => {
                          setFPS(fps);
                        }}
                        stepSize={1}
                        min={5}
                        max={30}
                        showTrackFill={false}
                      />
                    </div>
                  </>
                )}
              </div>
              {type === 'pdf' && (
                <>
                  <li className="bp5-menu-header">
                    <h6 className="bp5-heading">Page Size</h6>
                  </li>
                  <div style={{ padding: '10px' }}>
                    <Slider
                      value={pageSizeModifier}
                      labelRenderer={false}
                      onChange={(pageSizeModifier) => {
                        setPageSizeModifier(pageSizeModifier);
                      }}
                      stepSize={0.2}
                      min={0.2}
                      max={3}
                      showTrackFill={false}
                    />

                    <div>
                      {unit.pxToUnitRounded({
                        px: store.width * pageSizeModifier,
                        dpi: store.dpi,
                        precious: 0,
                        unit: 'mm',
                      })}{' '}
                      x{' '}
                      {unit.pxToUnitRounded({
                        px: store.height * pageSizeModifier,
                        dpi: store.dpi,
                        precious: 0,
                        unit: 'mm',
                      })}{' '}
                      mm
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {type === 'json' && (
            <>
              <div style={{ padding: '10px', maxWidth: '180px', opacity: 0.8 }}>
                JSON format is used for saving and loading projects. You can
                save your project to a file and load it later via "File" {'->'}{' '}
                "Open" menu.
              </div>
            </>
          )}
          {type === 'mp4' && (
            <>
              {/* <div style={{ padding: '10px', maxWidth: '180px', opacity: 0.8 }}>
                <strong>Beta feature.</strong>{' '}
                <a href="mailto:anton@polotno.com">
                  Let us know what you think!
                </a>
              </div> 
              {saving && (
                <div
                  style={{ padding: '10px', maxWidth: '180px', opacity: 0.8 }}
                >
                  <ProgressBar value={Math.max(3, progress) / 100} />
                </div>
              )}
            </>
          )} */}
          {/* <Button
            fill
            intent="primary"
            loading={saving}
            onClick={async () => {
              setSaving(true);
              try {
                if (type === 'pdf') {
                  await store.saveAsPDF({
                    fileName: getName() + '.pdf',
                    dpi: store.dpi / pageSizeModifier,
                    pixelRatio: 2 * quality,
                  });
                } else if (type === 'html') {
                  await store.saveAsHTML({
                    fileName: getName() + '.html',
                  });
                } else if (type === 'svg') {
                  await store.saveAsSVG({
                    fileName: getName() + '.svg',
                  });
                } else if (type === 'json') {
                  const json = store.toJSON();

                  const url =
                    'data:text/json;base64,' +
                    window.btoa(
                      unescape(encodeURIComponent(JSON.stringify(json)))
                    );

                  downloadFile(url, 'polotno.json');
                } else if (type === 'gif') {
                  await store.saveAsGIF({
                    fileName: getName() + '.gif',
                    pixelRatio: quality,
                    fps,
                  });
                } else if (type === 'mp4') {
                  setProgressStatus('scheduled');
                  await saveAsVideo({
                    store,
                    pixelRatio: quality,
                    onProgress: (progress, status) => {
                      setProgress(progress);
                      setProgressStatus(status);
                    },
                  });
                  setProgressStatus('done');
                  setProgress(0);
                } else {
                  if (store.pages.length < 3) {
                    store.pages.forEach((page, index) => {
                      // do not add index if we have just one page
                      const indexString =
                        store.pages.length > 1 ? '-' + (index + 1) : '';
                      store.saveAsImage({
                        pageId: page.id,
                        pixelRatio: quality,
                        mimeType: 'image/' + type,
                        fileName: getName() + indexString + '.' + type,
                      });
                    });
                  } else {
                    const zip = new JSZip();
                    for (const page of store.pages) {
                      const index = store.pages.indexOf(page);
                      const indexString =
                        store.pages.length > 1 ? '-' + (index + 1) : '';

                      const url = await store.toDataURL({
                        pageId: page.id,
                        pixelRatio: quality,
                        mimeType: 'image/' + type,
                      });
                      const fileName = getName() + indexString + '.' + type;
                      const base64Data = url.replace(
                        /^data:image\/(png|jpeg);base64,/,
                        ''
                      );
                      zip.file(fileName, base64Data, { base64: true });
                    }

                    const content = await zip.generateAsync({ type: 'base64' });
                    const result = 'data:application/zip;base64,' + content;
                    console.log(content);
                    downloadFile(result, getName() + '.zip');
                  }
                }
              } catch (e) {
                // throw into global error handler for reporting
                setTimeout(() => {
                  throw e;
                });
                alert('Something went wrong. Please try again.');
              }
              setSaving(false);
            }}
          >
            Download {type.toUpperCase()}
          </Button> */}

          {/* <MenuItem
            icon="media"
            text={t('toolbar.saveAsImage')}
            onClick={async () => {
              store.pages.forEach((page, index) => {
                // do not add index if we have just one page
                const indexString =
                  store.pages.length > 1 ? '-' + (index + 1) : '';
                store.saveAsImage({
                  pageId: page.id,
                  fileName: getName() + indexString + '.png',
                });
              });
            }}
          />
          <MenuItem
            icon="document"
            text={t('toolbar.saveAsPDF')}
            onClick={async () => {
              setSaving(true);
              await store.saveAsPDF({
                fileName: getName() + '.pdf',
              });
              setSaving(false);
            }}
          /> 
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button
        icon="import"
        text={t('toolbar.download')}
        intent=""
        className='rounded-lg px-3 py-2'
        // loading={saving}
        onClick={() => {
          setQuality(1);
        }}
      > Download</Button>
    </Popover> */}
    <DropdownMenu>
        <DropdownMenuTrigger>
          <Button onClick={() => {
              setQuality(1);
            }}>
            <LucideDownload className='h-4 mr-2'/> Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white mx-1">
          <DropdownMenuLabel>File type</DropdownMenuLabel>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[180px] mb-2">
              <SelectValue placeholder="PNG" defaultValue={"png"}  />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="gif">GIF</SelectItem>
              <SelectItem value="mp4">MP4 Video (Beta)</SelectItem>
            </SelectContent>
          </Select>
          {type !== 'json' && type !== 'html' && type !== 'svg' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Quality</DropdownMenuLabel>
              <div>
                <Slider
                  value={[quality]}
                  onValueChange={(quality) => {
                    setQuality(quality);
                  }}
                  step={0.2}
                  min={0.2}
                  max={maxQuality}
                  className='p-2'
                />
                {type === 'pdf' && (
                  <div className='p-2'>DPI: {Math.round(store.dpi * quality)}</div>
                )}
                {type !== 'pdf' && (
                  <div className='p-2'>
                    {Math.round(store.width * quality)} x{' '}
                    {Math.round(store.height * quality)} px
                  </div>
                )}
                {type === 'gif' && (
                  <>
                  <DropdownMenuSeparator />
                    <DropdownMenuLabel>FPS</DropdownMenuLabel>
                    <div>
                      <Slider
                        value={[fps]}
                        onValueChange={(fps) => {
                          setFPS(fps);
                        }}
                        step={1}
                        min={5}
                        max={30}
                        className='p-2'
                      />
                      <div className='p-2'>
                        {fps} FPS
                      </div>
                    </div>
                  </>
                )}
              </div>
              {type === 'pdf' && (
                <>
                <DropdownMenuSeparator />
                  <DropdownMenuLabel>Page Size</DropdownMenuLabel>
                  <div>
                    <Slider
                      value={[pageSizeModifier]}
                      onValueChange={(pageSizeModifier) => {
                        setPageSizeModifier(pageSizeModifier);
                      }}
                      step={0.2}
                      min={0.2}
                      max={3}
                      className='p-2'
                    />

                    <div className='p-2'>
                      {unit.pxToUnitRounded({
                        px: store.width * pageSizeModifier,
                        dpi: store.dpi,
                        precious: 0,
                        unit: 'mm',
                      })}{' '}
                      x{' '}
                      {unit.pxToUnitRounded({
                        px: store.height * pageSizeModifier,
                        dpi: store.dpi,
                        precious: 0,
                        unit: 'mm',
                      })}{' '}
                      mm
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {type === 'json' && (
            <>
              <div className='p-2 max-w-[180px]'>
                JSON format is used for saving and loading projects. You can
                save your project to a file and load it later via "File" {'->'}{' '}
                "Open" menu.
              </div>
            </>
          )}
          {type === 'mp4' && (
            <>
              {saving && (
                <div
                  style={{ padding: '10px', maxWidth: '180px', opacity: 0.8 }}
                >
                  <Progress value={Math.max(3, progress) / 100} />
                </div>
              )}
            </>
          )}
          <DropdownMenuSeparator />
          <Button
            loading={saving}
            className=' my-3 w-full px-3 py-2'
            onClick={async () => {
              setSaving(true);
              try {
                if (type === 'pdf') {
                  await store.saveAsPDF({
                    fileName: getName() + '.pdf',
                    dpi: store.dpi / pageSizeModifier,
                    pixelRatio: 2 * quality,
                  });
                } else if (type === 'html') {
                  await store.saveAsHTML({
                    fileName: getName() + '.html',
                  });
                } else if (type === 'svg') {
                  await store.saveAsSVG({
                    fileName: getName() + '.svg',
                  });
                } else if (type === 'json') {
                  const json = store.toJSON();

                  const url =
                    'data:text/json;base64,' +
                    window.btoa(
                      unescape(encodeURIComponent(JSON.stringify(json)))
                    );

                  downloadFile(url, 'flashkit.json');
                } else if (type === 'gif') {
                  await store.saveAsGIF({
                    fileName: getName() + '.gif',
                    pixelRatio: quality,
                    fps,
                  });
                } else if (type === 'mp4') {
                  setProgressStatus('scheduled');
                  await saveAsVideo({
                    store,
                    pixelRatio: quality,
                    onProgress: (progress, status) => {
                      setProgress(progress);
                      setProgressStatus(status);
                    },
                  });
                  setProgressStatus('done');
                  setProgress(0);
                } else {
                  if (store.pages.length < 3) {
                    store.pages.forEach((page, index) => {
                      // do not add index if we have just one page
                      const indexString =
                        store.pages.length > 1 ? '-' + (index + 1) : '';
                      store.saveAsImage({
                        pageId: page.id,
                        pixelRatio: quality,
                        mimeType: 'image/' + type,
                        fileName: getName() + indexString + '.' + type,
                      });
                    });
                  } else {
                    const zip = new JSZip();
                    for (const page of store.pages) {
                      const index = store.pages.indexOf(page);
                      const indexString =
                        store.pages.length > 1 ? '-' + (index + 1) : '';

                      const url = await store.toDataURL({
                        pageId: page.id,
                        pixelRatio: quality,
                        mimeType: 'image/' + type,
                      });
                      const fileName = getName() + indexString + '.' + type;
                      const base64Data = url.replace(
                        /^data:image\/(png|jpeg);base64,/,
                        ''
                      );
                      zip.file(fileName, base64Data, { base64: true });
                    }

                    const content = await zip.generateAsync({ type: 'base64' });
                    const result = 'data:application/zip;base64,' + content;
                    console.log(content);
                    downloadFile(result, getName() + '.zip');
                  }
                }
              } catch (e) {
                // throw into global error handler for reporting
                setTimeout(() => {
                  throw e;
                });
                alert('Something went wrong. Please try again.');
              }
              setSaving(false);
            }}
          >
            Download {type.toUpperCase()}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
});
