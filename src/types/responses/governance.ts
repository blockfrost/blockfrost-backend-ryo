import type { OpenApiResponseTypes } from '../openapi-wrapper';

export type DReps = OpenApiResponseTypes['drep_content'];
export type DRepsDrepID = OpenApiResponseTypes['drep_details_content'];
export type DRepsDrepIDMetadata = OpenApiResponseTypes['drep_metadata'];
export type DRepsDrepIDUpdates = OpenApiResponseTypes['drep_updates'];
export type DRepsDrepIDDelegators = OpenApiResponseTypes['drep_delegators'];
export type DRepsDrepIDVotes = OpenApiResponseTypes['drep_votes'];
export type Proposals = OpenApiResponseTypes['proposal_content'];
export type ProposalsProposal = OpenApiResponseTypes['proposal_details_content'];
export type ProposalsProposalVote = OpenApiResponseTypes['proposal_details_votes'];
