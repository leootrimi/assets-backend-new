import { Injectable } from "@nestjs/common";
import { ApiRequest } from "./ApiRequest";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class Auth0Utility {
    constructor(
        private readonly apiRequest: ApiRequest
    ) {}

    async createAuth0User(user_metadata: CreateUserDto) {

        const auth0UserPayload = {
            email: user_metadata.email,
            connection: "Username-Password-Authentication",
            password: "Testing123!",
            email_verified: false,
            verify_email: true,

            given_name: user_metadata.firstName,
            family_name: user_metadata.lastName,
            name: `${user_metadata.firstName} ${user_metadata.lastName}`,

            user_metadata: {
                firstName: user_metadata.firstName,
                lastName: user_metadata.lastName,
                email: user_metadata.email,
                position: user_metadata.position,
                level: user_metadata.level,
                country: user_metadata.country,
                city: user_metadata.city,
                state: user_metadata.state,
                zipCode: user_metadata.zipCode,
                company: user_metadata.company,
                company_id: user_metadata.company_id
            }
            };

        try {
            const tokens = await this.getAccessTokenForUsers()
            const accessToken = tokens.access_token;

            const url = process.env.AUTH0_AUDIENCE || '';
            
            const response = await this.apiRequest.makeRequest(
            `${url}users`,
            'POST',
            auth0UserPayload, 
            {
                Authorization: `Bearer ${accessToken}`,
            }
            );
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    async fetchAuth0Users(company_id: string) {
        try {
            const tokens = await this.getAccessTokenForUsers()
            const accessToken = tokens.access_token;

            const url = process.env.AUTH0_AUDIENCE || '';
            
            const response = await this.apiRequest.makeRequest(
            `${url}users`,
            'GET',
            undefined, 
            {
                Authorization: `Bearer ${accessToken}`,
            },
            {
                q: `user_metadata.company_id:"${company_id}"`,
                search_engine: 'v3'
            }
            );

            console.log('Users response:', response);
            return response;

        } catch (error) {
            console.error('Error fetching users from Auth0:', error.response?.data || error.message);
            throw new Error('Failed to fetch users from Auth0');
        }
    }

    async fetchUserById(id: string) {
        try {
            const token = await this.getAccessTokenForUsers();
            const accessToken = token.access_token;

             const url = process.env.AUTH0_AUDIENCE || '';
            
            const response = await this.apiRequest.makeRequest(
            `${url}users/${id}`,
            'GET',
            undefined, 
            {
                Authorization: `Bearer ${accessToken}`,
            }
            );

            console.log('Users response:', response);
            return response;

        } catch (error) {
            console.log(error.message);
            
        }
    }

    async updateUser(id: string, user_metadata: CreateUserDto) {
        let getAccessToken = await this.getAccessTokenForUsers();
        let access_token = getAccessToken.access_token;
        
        const url = process.env.AUTH0_AUDIENCE || ''
        const response = await this.apiRequest.makeRequest(
            `${url}users/${id}`,
             'PATCH',
            { user_metadata: user_metadata},
              { Authorization: `Bearer ${access_token}` }
             )

        return response
    }

    async createOgranization(organization: any) {
        
        try {
            const tokens = await this.getAccessTokenForUsers()
            const accessToken = tokens.access_token;

            const url = process.env.AUTH0_AUDIENCE || '';
            
            const response = await this.apiRequest.makeRequest(
            `${url}organizations`,
            'POST',
            organization, 
            {
                Authorization: `Bearer ${accessToken}`,
            }
            );

            console.log('Organization response:', response);
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }
    
    async getAccessTokenForUsers(): Promise<any> {
        let url = process.env.AUTH0_ISSUER_URL || '';
        let body = {
            "client_id": process.env.AUTH0_API_CLIENTID || '',
            "client_secret": process.env.AUTH0_CLIENTSECRET || '',
            "audience": process.env.AUTH0_AUDIENCE || '',
            "grant_type": "client_credentials"
        }

        const response = await this.apiRequest.makeRequest(`${url}oauth/token`,'POST',body)
        return response
    }
}