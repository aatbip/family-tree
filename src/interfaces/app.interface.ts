export interface FamilyDetail {
  spouse: string | undefined;
  location: string | undefined;
  birthYear: string | undefined;
  presentAddress: string | undefined;
  familyPhoto: string[] | undefined;
}

export interface FamilyMember {
  id: string;
  parentId: string | null; 
  name: string;
  familyDetail: FamilyDetail;
  children: FamilyMember[];
}
