import React from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationInfo {
    current_page: number;
    from: number;
    last_page: number;
    first_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page_url: string;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface PaginationComponentProps {
    paginationInfo: PaginationInfo;
    onPageChange: (page: number) => void;
}



const PaginationComponent: React.FC<PaginationComponentProps> = ({ paginationInfo, onPageChange }) => {
    const handlePageChange = (url: string | null) => {
        if (url) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const page = urlParams.get('page');
            if (page) {
                onPageChange(Number(page));
            }
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => handlePageChange(paginationInfo.prev_page_url)} />
                </PaginationItem>
                {paginationInfo.links.map((link, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            isActive={link.active}
                            onClick={() => handlePageChange(link.url)}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => handlePageChange(paginationInfo.next_page_url)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
