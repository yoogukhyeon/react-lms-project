import styled from 'styled-components';
import CourseVideo from '@/components/course/CourseVideo';
import CourseList from '@/components/course/CourseList';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCourseListPreFetchQuery, useCourseListQuery } from '@/api/course';
import Loading from '@/components/common/Loading';
import MetaTag from '@/constants/SEOMetaTag';

export default function Course() {
    const [searchParams] = useSearchParams();
    const channel = searchParams.get('channel');
    const video = searchParams.get('video');

    const { data, status } = useCourseListQuery(channel, video);

    useEffect(() => {
        if (data?.courseList) {
            for (let key of data?.courseList) {
                useCourseListPreFetchQuery(key.channelTitle, key.videoId);
            }
        }
    }, [data]);

    return (
        <>
            <MetaTag
                title="축구영상"
                description="축구, 축구소식, 최신축구소식, 피파, 피파온라인, 에펨, 축구커뮤니티"
            />
            {status === 'loading' && <Loading />}
            {status === 'error' && <div>Server Error...</div>}
            {data && (
                <CourseWrap>
                    <div>
                        <CourseVideo video={data.videoInfo} />
                        <CourseList lists={data.courseList} title={data.videoInfo.channelTitle} />
                    </div>
                </CourseWrap>
            )}
        </>
    );
}

const CourseWrap = styled.div`
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 0 8px;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 768px) {
            & {
                flex-direction: column;
                align-self: auto;
            }
        }
    }
`;
