import { getCMSDomain } from '@utilities/dev';
import Image from 'next/image';
import { BsCheckCircleFill, BsFillRecordFill, BsFillXCircleFill } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const textColor = (props) => {
  let content = props.children ? props.children[0] : '';
  content = typeof content === 'string' && content.replace('(frame)', '');
  content = typeof content === 'string' && content.replace('(frame-2)', '');
  content = typeof content === 'string' && content.replace('(frame-3)', '');
  content = typeof content === 'string' && content.replace('(frame-4)', '');
  content = typeof content === 'string' && content.replace('(center)', '');
  content = typeof content === 'string' && content.replace('(right)', '');
  const regExp = /\(([^)]+)\)/;
  const condition = regExp.exec(content);
  const getClass = condition !== null ? `${condition[1]}` : 'black';
  const text = condition !== null ? content.replace(`(${condition[1]})`, '') : props.children;
  return {
    getClass,
    text,
    condition,
  };
};

const TextFrame = ({ children, data }) => {
  const content = data.children ? data.children[0] : '';
  let condition = null;
  if (content.includes('(frame)')) {
    condition = 'frame';
  } else if (content.includes('(frame-2)')) {
    condition = 'frame-2';
  } else if (content.includes('(frame-3)')) {
    condition = 'frame-3';
  } else if (content.includes('(frame-4)')) {
    condition = 'frame-4';
  }

  const alignCenter = content.includes('(center)');
  const alignRight = content.includes('(right)');
  let alignment = 'text-left';
  if (alignCenter) {
    alignment = 'text-center';
  } else if (alignRight) {
    alignment = 'text-right';
  }

  switch (condition) {
    case 'frame':
      return (
        <div className='pr-2 pb-2 relative'>
          <div className='bg-blog px-3 py-1 rounded-lg relative z-10'>
            <div className={`clear-both ${alignment}`}>{children}</div>
          </div>
          <div className='absolute bottom-0 w-full h-full pl-2 pt-2'>
            <div className='w-full h-full bg-gradient-to-t from-golden-2 to-golden-1 rounded-lg' />
          </div>
        </div>
      );
    case 'frame-2':
      return (
        <div className='relative'>
          <div className='px-10 md:px-20 py-1 rounded-lg relative z-10'>
            <div className={`clear-both ${alignment}`}>{children}</div>
          </div>
          <div className='absolute bottom-0 w-full h-full'>
            <div className='absolute -top-2 left-5'>
              <Image src='/assets/main/svg/quote.svg' alt='qoute' width={20} height={20} />
            </div>
            <div className='w-full h-full bg-gray-200 rounded-lg' />
            <div className='absolute -bottom-4 right-5'>
              <Image
                src='/assets/main/svg/quote.svg'
                alt='qoute'
                width={20}
                height={20}
                className='rotate-180'
              />
            </div>
          </div>
        </div>
      );
    case 'frame-3':
      return (
        <div className='relative'>
          <div className='relative w-[150px] mx-auto'>
            <Image
              src='/assets/blog/three-star.svg'
              alt='three-star'
              layout='responsive'
              width={84}
              height={33}
            />
          </div>
          <div className='relative w-full h-full py-4'>
            <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-full'>
              <div className='relative'>
                <Image
                  src='/assets/blog/golden-border.svg'
                  alt='golden-border'
                  layout='responsive'
                  width={953}
                  height={8}
                />
              </div>
            </div>
            <div className='relative flex justify-center'>
              <div className='clear-both text-center bg-blog px-3'>
                <div className='text-gradient-2'>{children}</div>
              </div>
            </div>
          </div>
          <div className='relative'>
            <Image
              src='/assets/blog/golden-border.svg'
              alt='golden-border'
              layout='responsive'
              width={953}
              height={8}
            />
          </div>
        </div>
      );
    case 'frame-4':
      return (
        <div className='relative'>
          <div className='relative w-[60px] mx-auto mb-3'>
            <Image src='/assets/blog/strapi/quote.svg' alt='qoute' width={47} height={40} />
          </div>
          <div>
            <div className={`clear-both ${alignment} text-center`}>{children}</div>
          </div>
        </div>
      );
    default:
      return children;
  }
};

export const RichTextMarkdown = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
        ul: ({ node, ...props }) => {
          return (
            <ul>
              {props.children.map((load, idx) => {
                if (idx % 2 === 1) {
                  const checkTrue = load.props.children[0].includes('(true)');
                  const checkFalse = load.props.children[0].includes('(false)');
                  if (checkTrue && !checkFalse) {
                    return (
                      <li key={load.props.children[0]}>
                        <span className='pl-2 flex items-start'>
                          <span className='w-[30px]'>
                            <BsCheckCircleFill className='text-green-600 mt-1' />
                          </span>
                          <span className='w-full'>
                            {load.props.children[0].replace('(true)', '')}
                          </span>
                        </span>
                      </li>
                    );
                  }
                  if (!checkTrue && checkFalse) {
                    return (
                      <li key={load.props.children[0]}>
                        <span className='pl-2 flex items-start'>
                          <span className='w-[30px]'>
                            <BsFillXCircleFill className='text-red-600 mt-1' />
                          </span>
                          <span className='w-full'>
                            {load.props.children[0].replace('(true)', '')}
                          </span>
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={load.props.children[0]}>
                      <span className='pl-2 flex items-start'>
                        <span className='w-[30px]'>
                          <BsFillRecordFill size={10} className='text-black mt-2' />
                        </span>
                        <span className='w-full'>
                          {load.props.children[0].replace('(true)', '')}
                        </span>
                      </span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          );
        },
        blockquote: ({ node, ...props }) => {
          return (
            <div className='bg-quote px-5 py-2 w-full rounded-lg whitespace-pre-line'>
              {props.children}
            </div>
          );
        },
        a: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <a href={props.href} style={{ color: getClass }}>
              {text}
            </a>
          );
        },
        img: ({ node, ...props }) => {
          const left = props.src.includes('(left)');
          const right = props.src.includes('(right)');
          const center = props.src.includes('(center)');
          const video = props.src.includes('(video)');
          let classTag = '';
          let { src } = props;

          if (left) {
            classTag = 'float-left mr-4 mb-4';
            src = props.src.replace('(left)', '');
          } else if (right) {
            classTag = 'float-right ml-4 mb-4';
            src = props.src.replace('(right)', '');
          } else if (center) {
            classTag = 'mx-auto';
            src = props.src.replace('(center)', '');
          } else if (video) {
            src = props.src.replace('(video)', '');
          }
          return video ? (
            <div className='w-full h-[150px] md:h-[500px] relative'>
              <iframe
                src={`https://www.youtube.com/embed/${src}?controls=0`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
                allowFullScreen={false}
                className='w-full h-full'
                width='1280'
                height='720'
              />
            </div>
          ) : (
            <a href='/'>
              <img
                src={`${getCMSDomain()}${src}`}
                alt={props.alt}
                title={props.alt}
                className={`${classTag} lazyload`}
              />
            </a>
          );
        },
        br: () => {
          return <br clear='all' />;
        },
        em: ({ node, ...props }) => {
          const { getClass, text, condition } = textColor(props);
          return condition === null ? (
            <i>{text}</i>
          ) : (
            <span style={{ color: getClass }}>{text}</span>
          );
        },
        strong: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <strong style={{ color: getClass }} className='font-bolded'>
              {text}
            </strong>
          );
        },
        h1: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h1 style={{ color: getClass }}>{text}</h1>
            </TextFrame>
          );
        },
        h2: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h2 style={{ color: getClass }}>{text}</h2>
            </TextFrame>
          );
        },
        h3: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h3 style={{ color: getClass }}>{text}</h3>
            </TextFrame>
          );
        },
        h4: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h4 style={{ color: getClass }}>{text}</h4>
            </TextFrame>
          );
        },
        h5: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h5 style={{ color: getClass }}>{text}</h5>
            </TextFrame>
          );
        },
        h6: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h6 style={{ color: getClass }}>{text}</h6>
            </TextFrame>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
